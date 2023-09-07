from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
    demo = User(
        first_name='Demo', last_name='Lition', username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        first_name='Marnie', last_name='Carnie', username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='Bobbie', last_name='Shmobbie', username='bobbie', email='bobbie@aa.io', password='password')
    martyn = User(
        first_name='Martyn', last_name="O'Connor DeLosRios-Roberts", username='martyn', email='martyn@aa.io', password='password')
    alex = User(
        first_name='Alex', last_name='Lexie', username='alex', email='alex@aa.io', password='password')
    taylor = User(
        first_name='Taylor', last_name='Tailor', username='taylor', email='taylor@aa.io', password='password')
    jordan = User(
        first_name='Jordan', last_name='Jordanie', username='jordan', email='jordan@aa.io', password='password')
    morgan = User(
        first_name='Morgan', last_name='Morganie', username='morgan', email='morgan@aa.io', password='password')
    casey = User(
        first_name='Casey', last_name='Casie', username='casey', email='casey@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(martyn)
    db.session.add(alex)
    db.session.add(taylor)
    db.session.add(jordan)
    db.session.add(morgan)
    db.session.add(casey)
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
