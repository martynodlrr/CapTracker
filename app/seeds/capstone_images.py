from sqlalchemy.sql import text
from datetime import datetime

from app.models import Capstone, CapstoneImage, db, environment, SCHEMA, User

def seed_capstone_images():
    capstones = Capstone.query.all()

    placeholder_url = "https://via.placeholder.com/150"

    for capstone in capstones:
        for i in range(5):
            capstone_image = CapstoneImage(
                image_url='https://sites.udel.edu/njimenez/files/2018/05/how-to-create-a-website-feature-image-e1496943224192-1yzdyp6.jpg',
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
