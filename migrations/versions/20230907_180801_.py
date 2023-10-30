"""Create db

Revision ID: 3b5c74f8a31b
Revises:
Create Date: 2023-09-07 10:55:14.388523

"""
import sqlalchemy as sa
from alembic import op
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = "3b5c74f8a31b"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("given_name", sa.String(length=25), nullable=False),
        sa.Column("family_name", sa.String(length=50), nullable=False),
        sa.Column("nick_name", sa.String(length=40), nullable=False),
        sa.Column("email", sa.String(length=75), nullable=False),
        sa.Column("hashed_password", sa.String(length=125), nullable=False),
        sa.Column("picture", sa.String(length=200), nullable=True),
        sa.Column("linkedin", sa.String(length=175), nullable=True),
        sa.Column("github", sa.String(length=100), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email"),
        sa.UniqueConstraint("nick_name"),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA}")
    op.create_table(
        "capstones",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=50), nullable=False),
        sa.Column("url", sa.String(length=150), nullable=True),
        sa.Column("description", sa.String(length=1000), nullable=False),
        sa.Column("cloned_from", sa.String(length=75), nullable=False),
        sa.Column("user_id", sa.String(length=75), nullable=True),
        sa.Column("created_at", sa.TIMESTAMP(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE capstones SET SCHEMA {SCHEMA}")
    op.create_table(
        "capstoneimages",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("image_url", sa.String(length=200), nullable=False),
        sa.Column("capstone_id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.String(length=75), nullable=True),
        sa.Column("created_at", sa.TIMESTAMP(), nullable=False),
        sa.ForeignKeyConstraint(
            ["capstone_id"],
            ["capstones.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE capstoneimages SET SCHEMA {SCHEMA}")
    op.create_table(
        "reviews",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("author", sa.String(length=40), nullable=True),
        sa.Column("capstone_id", sa.Integer(), nullable=True),
        sa.Column("comment", sa.String(length=1000), nullable=False),
        sa.Column("created_at", sa.TIMESTAMP(), nullable=True),
        sa.ForeignKeyConstraint(
            ["capstone_id"],
            ["capstones.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA}")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("reviews")
    op.drop_table("capstoneimages")
    op.drop_table("capstones")
    op.drop_table("users")
    # ### end Alembic commands ###
