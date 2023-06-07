from sqlalchemy import Column, Integer, String, Table, create_engine, MetaData, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from datetime import datetime


metadata = MetaData()

# Comment Table Definition
comments = Table(
    "comments",
    metadata,
    Column("id", Integer, primary_key=True, nullable=False, unique=True, server_default="nextval('comments_id_seq'::regclass)"),
    Column("created_at", DateTime(timezone=True), nullable=False, server_default=func.now()),
    Column("updated_at", DateTime(timezone=True), nullable=True, server_default=func.now(), onupdate=datetime.now()),
    Column("deleted_at", DateTime(timezone=True)),
    Column("user_id", Integer, ForeignKey("users.id", onupdate="CASCADE", ondelete="NO ACTION"), nullable=False),
    Column("forum_id_id", Integer, ForeignKey("forums.id", onupdate="CASCADE", ondelete="NO ACTION"), nullable=False),
    Column("comment", String(length=255), nullable=False),
    Column("deleted", Boolean, nullable=False),
)