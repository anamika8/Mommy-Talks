import os
from http.client import HTTPException
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import databases
import uvicorn
import sqlalchemy
from sqlalchemy import create_engine, update
from sqlalchemy.sql import select
from table_comments import comments
from table_users import users
from request_body import SearchRequestBody, CommentRequestBody
from datetime import datetime

# Load environment variables from .env file
load_dotenv()

# Initialize the FastAPI app
app = FastAPI()
DATABASE_URL = os.environ.get("DATABASE_URL")
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()
engine = create_engine(DATABASE_URL)

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:8000",
    # Add more allowed origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def setup():
    return {"message": "success"}


@app.get("/comments")
async def get_comments():
    query = select([comments]).where(comments.c.deleted == False)
    result = await database.fetch_all(query)
    return result


@app.put("/comment")
async def update_comment(req_body: CommentRequestBody):
    new_comment = req_body.comment
    comment_id = req_body.commentId
    query = update(comments) \
        .where(comments.c.id == comment_id) \
        .values(comment=new_comment, updated_at=datetime.now())
    result = await database.execute(query)
    if result == 0:
        raise HTTPException(status_code=500, detail="Comment not found")

    query = select([comments]).where(comments.c.id == comment_id)
    response = await database.fetch_one(query)
    if not response:
        response = f"Comment not found with id - {comment_id}"
    return response


@app.delete("/comment")
async def delete_comment(req_body: SearchRequestBody):
    new_comment = req_body.comment
    comment_id = req_body.commentId
    query = update(comments) \
        .where(comments.c.id == comment_id) \
        .values(deleted_at=datetime.now(), updated_at=datetime.now(), deleted=True)
    result = await database.execute(query)
    if result == 0:
        raise HTTPException(status_code=500, detail="Comment not found")

    query = select([comments]).where(comments.c.id == comment_id)
    response = await database.fetch_one(query)
    if not response:
        response = f"Comment not found with id - {comment_id}"
    return response


@app.post("/comment")
async def create_comment(req_body: CommentRequestBody):
    new_comment = req_body.comment
    forum_id = req_body.forumId
    user_email = req_body.user

    # first find user id
    query = select([users]).where(users.c.email == user_email)
    response = await database.fetch_one(query)
    user_id = response.id

    insert_query = comments.insert().values(
        created_at=datetime.now(),
        updated_at=datetime.now(),
        deleted_at=None,
        user_id=user_id,
        forum_id_id=int(forum_id),
        comment=new_comment,
        deleted=False,
    )
    await database.execute(insert_query)
    return {"message": "Comment created successfully"}


@app.get("/comments/{forum_id}")
async def get_forum_comments(forum_id: int):
    print("Looking for comments under forum_id", forum_id)
    query = select([comments]).where(comments.c.forum_id_id == forum_id, comments.c.deleted == False)
    result = await database.fetch_all(query)
    if not result:
        result = f"Comments not found with forum id - {forum_id}"
    return result


@app.on_event("startup")
async def startup():
    await database.connect()
    metadata.create_all(bind=engine)
    print("hi")


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
    print("bye")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
