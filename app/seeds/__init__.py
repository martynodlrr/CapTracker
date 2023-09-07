from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .post_images import seed_post_images, undo_post_images
from .reviews import seed_reviews, undo_reviews
from app.models import db, environment, SCHEMA

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        undo_posts()
        undo_post_images()
        undo_reviews()
    seed_users()
    seed_posts()
    seed_post_images()
    seed_reviews()

@seed_commands.command('undo')
def undo():
    undo_users()
    undo_posts()
    undo_post_images()
    undo_reviews()
