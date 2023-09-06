from .db import db, environment, SCHEMA, add_prefix_for_prod

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False, unique=True)
    url = db.Column(db.String(150))
    description = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.TIMESTAMP)

    # relations
    author = db.relationship("User", back_populates="user_posts")
    post_images = db.relationship("PostImage", back_populates="post")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "url": self.url,
            "description": self.description,
            "created_at": self.created_at
        }