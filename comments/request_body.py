from pydantic import BaseModel
from typing import Optional


class SearchRequestBody(BaseModel):
    commentId: Optional[int]
    comment: Optional[str]
    id: Optional[int]


class CommentRequestBody(BaseModel):
    commentId: Optional[int]
    comment: str
    user: Optional[str]
    forumId: Optional[str]
