from sqlalchemy.sql import text
from datetime import datetime

from app.models import Capstone, CapstoneImage, db, environment, SCHEMA, User

def seed_capstone_images():
    capstones = Capstone.query.all()

    images = [
        'https://miro.medium.com/v2/resize:fit:700/1*ZvtdfRPAdFpf2av_bvqE6w.png',
        'https://bpb-us-w2.wpmucdn.com/sites.udel.edu/dist/7/4534/files/2018/05/how-to-create-a-website-feature-image-e1496943224192-1yzdyp6.jpg',
        'https://thewebsitearchitect.com/wp-content/uploads/2021/02/How-do-you-draw-a-website-wireframe.jpg',
        'https://techindustan.com/wp-content/uploads/2018/05/10241.jpg',
        'https://cdn.sanity.io/images/599r6htc/localized/bda2660181ef9f8ba0380a54360479cd0bde3f8e-1108x1108.png?w=514&h=514&q=75&fit=max&auto=format'
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
