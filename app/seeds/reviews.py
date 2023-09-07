from app.models import User, Post, Review, db, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    users = User.query.all()
    posts = Post.query.all()

    for post in posts:
        reviewers = [user for user in users if user.id != post.user_id]
        for i, reviewer in enumerate(reviewers[:3]): # Get the first 3 users who are not the author to review
            review = Review(
                user_id=reviewer.id,
                comment=f"Review {i+1} for post {post.id}",
                created_at=datetime.utcnow()
            )
            post.reviews.append(review)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
