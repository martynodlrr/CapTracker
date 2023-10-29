from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from .db import db, environment, SCHEMA, add_prefix_for_prod


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    given_name = db.Column(db.String(25), nullable=False)
    family_name = db.Column(db.String(50), nullable=False)
    nick_name = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(75), nullable=False, unique=True)
    hashed_password = db.Column(db.String(125), nullable=False)
    picture = db.Column(db.String(200))
    linkedin = db.Column(db.String(175))
    github = db.Column(db.String(100))

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "given_name": self.given_name,
            "family_name": self.family_name,
            "nickName": self.nick_name,
            "LinkedIn": self.linkedin,
            "GitHub": self.github,
            "email": self.email,
            "picture": self.picture,
        }
