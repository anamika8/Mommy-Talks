from sqlalchemy import Column, Integer, String, Table, UniqueConstraint, MetaData, TIMESTAMP, Text, Boolean


metadata = MetaData()

# Users Table Definition
users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True, nullable=False, unique=True, server_default="nextval('comments_id_seq'::regclass)"),
    Column("created_at", TIMESTAMP(timezone=True), nullable=False),
    Column("updated_at", TIMESTAMP(timezone=True), nullable=False),
    Column("deleted_at", TIMESTAMP(timezone=True)),
    Column("email", String(255), nullable=False),
    Column("first_name", String(255), nullable=False),
    Column("last_name", String(255), nullable=False),
    Column("uuid", String(255), nullable=False),
    Column("last_login", TIMESTAMP(timezone=True)),
    Column("role", Text, nullable=False)
)

# Optional: Create unique constraint on email
unique_constraint = UniqueConstraint("email", name="users_email_unique")
users.append_constraint(unique_constraint)
