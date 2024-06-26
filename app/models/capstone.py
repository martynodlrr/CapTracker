from .db import db, environment, SCHEMA, add_prefix_for_prod

class Capstone(db.Model):
    __tablename__ = "capstones"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(150))
    description = db.Column(db.String(1000), nullable=False)
    cloned_from = db.Column(db.String(75), nullable=False)
    user_id = db.Column(db.String(75), nullable=False, index=True)
    created_at = db.Column(db.TIMESTAMP, index=True)

    # relations
    capstone_images = db.relationship("CapstoneImage", back_populates="capstone")
    reviews = db.relationship("Review", back_populates="capstone")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.user_id,
            "url": self.url,
            "description": self.description,
            "clonedFrom": self.cloned_from,
            "created_at": self.created_at.isoformat().split('T')[0] if self.created_at else None,
            "capstoneImages": [image.to_dict() for image in self.capstone_images],
            "reviews": [review.to_dict() for review in self.reviews],
        }
