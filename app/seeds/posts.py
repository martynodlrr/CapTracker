from app.models import User, Post, db, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_posts():
    users = User.query.all()

    for i, user in enumerate(users):
        post = Post(
            title=f"Post by {user.username}",
            url=f"http://post_by_{user.username}.com",
            description=f"This is a post description by {user.username}",
            user_id=user.id,
            created_at=datetime.utcnow()
        )
# datetime.utcnow()) -- 2023-09-07 15:55:26.873143
        db.session.add(post)
        db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.postImages RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        db.session.execute(text("DELETE FROM postImages"))
        db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()
