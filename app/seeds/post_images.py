from app.models import Post, PostImage, db, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_post_images():
    posts = Post.query.all()

    placeholder_url = "https://via.placeholder.com/150"

    for post in posts:
        for i in range(5):
            post_image = PostImage(
                url=f"{placeholder_url}?text=Image{i+1}",
                post_id=post.id,
                created_at=datetime.utcnow()
            )
            db.session.add(post_image)

    db.session.commit()

def undo_post_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.postimages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM postimages"))
        
    db.session.commit()
