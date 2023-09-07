from .db import db, environment, SCHEMA, add_prefix_for_prod

class CapstoneImage(db.Model):
    __tablename__ = "capstoneimages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(200), nullable=False)
    capstone_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("capstones.id")))
    created_at = db.Column(db.TIMESTAMP)

    # relations
    capstone = db.relationship("Capstone", back_populates="capstone_images")

    def to_dict(self):
        return {
            "id": self.id,
            "imageUrl": self.image_url,
            "created_at": self.created_at.isoformat().split('T')[0] if self.created_at else None,
        }
