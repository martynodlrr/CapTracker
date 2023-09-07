from app.models import User, Capstone, db, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_capstones():
    users = User.query.all()

    for i, user in enumerate(users):
        capstone = Capstone(
            title=f"Capstone by {user.username}",
            url=f"http://capstone_by_{user.username}.com",
            description=f"This is a capstone description by {user.username}",
            user_id=user.id,
            created_at=datetime.utcnow()
        )
# datetime.utcnow()) -- 2023-09-07 15:55:26.873143
        db.session.add(capstone)
        db.session.commit()

def undo_capstones():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.capstones RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.capstoneimages RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM capstones"))
        db.session.execute(text("DELETE FROM capstoneimages"))
        db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()
