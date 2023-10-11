from sqlalchemy.sql import text
from datetime import datetime

from app.models import Capstone, CapstoneImage, db, environment, SCHEMA, User

def seed_capstone_images():
    capstones = Capstone.query.all()

    images = [
        'https://alvarotrigo.com/blog/assets/imgs/2022-07-02/global-sources-wireframe-example.jpeg',
        'https://captracker.s3.amazonaws.com/a2782804b7234f6cacca519e9c0a5b9d.jpg',
        'https://captracker.s3.amazonaws.com/5967e0a4144b4ced9ce12109a4f61425.jpg',
        'https://captracker.s3.amazonaws.com/96df691dd2384bf8af5352a3e155d71a.jpg',
        'https://captracker.s3.amazonaws.com/e62afd0ef92b4d31b6eab71746cb5cca.jpg'
    ]

    for capstone in capstones:
        for i in range(5):
            capstone_image = CapstoneImage(
                image_url=images[i % len(images)],
                capstone_id=capstone.id,
                user_id=capstone.user_id,
                created_at=datetime.utcnow()
            )
            db.session.add(capstone_image)

    db.session.commit()

def undo_capstone_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.capstoneimages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM capstoneimages"))

    db.session.commit()
