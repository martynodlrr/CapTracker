from flask.cli import AppGroup

from .capstone_images import seed_capstone_images, undo_capstone_images
from .capstones import seed_capstones, undo_capstones
from .reviews import seed_reviews, undo_reviews
from app.models import db, environment, SCHEMA
from .users import seed_users, undo_users

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        undo_capstones()
        undo_capstone_images()
        undo_reviews()
    seed_users()
    seed_capstones()
    seed_capstone_images()
    seed_reviews()

@seed_commands.command('undo')
def undo():
    undo_users()
    undo_capstones()
    undo_capstone_images()
    undo_reviews()
