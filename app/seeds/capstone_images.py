from app.models import Capstone, CapstoneImage, db, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_capstone_images():
    capstones = Capstone.query.all()

    placeholder_url = "https://via.placeholder.com/150"

    for capstone in capstones:
        for i in range(5):
            capstone_image = CapstoneImage(
                image_url=f"{placeholder_url}?text=Image{i+1}",
                capstone_id=capstone.id,
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
