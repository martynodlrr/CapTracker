from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    capstone_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("capstones.id")))
    comment = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.TIMESTAMP)

    # relations
    reviewer = db.relationship("User", back_populates="user_reviews")
    capstone = db.relationship("Capstone", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "capstone_id": self.capstone_id,
            "createdAt": self.created_at.isoformat().split('T')[0] if self.created_at else None,
            "author": self.reviewer.to_dict()
        }
