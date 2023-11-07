from sqlalchemy.sql import text
from datetime import datetime

from app.models import User, Capstone, Review, db, environment, SCHEMA

def seed_reviews():
    users = User.query.all()
    capstones = Capstone.query.all()

    for capstone in capstones:
        reviewers = [user for user in users if f'{user.id}' != capstone.user_id]
        for i, reviewer in enumerate(reviewers[:25]):
            review = Review(
                author=reviewer.nick_name,
                comment=f"Review {i+1} for capstone {capstone.title}",
                created_at=datetime.utcnow()
            )
            capstone.reviews.append(review)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
