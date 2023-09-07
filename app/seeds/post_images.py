from app.models import Post, PostImage, db
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
    db.session.execute('TRUNCATE post_images RESTART IDENTITY CASCADE;')
    db.session.commit()
