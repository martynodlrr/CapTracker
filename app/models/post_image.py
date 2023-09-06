from .db import db, environment, SCHEMA, add_prefix_for_prod

class PostImage(db.Model):
    __tablename__ = "postImages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(200), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))
    created_at = db.Column(db.TIMESTAMP)

    # relations
    post = db.relationship("Post", back_populates="post_images")

    def to_dict(self):
        return {
            "id": self.id,
            "url": self.url,
            "post_id": self.post_id,
            "created_at": self.created_at
        }
