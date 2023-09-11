from sqlalchemy.sql import text

from app.models import db, User, environment, SCHEMA

def seed_users():
    demo = User(
        first_name='Demo', last_name='Lition', username='Demo', email='demo@aa.io', password='password', pfp="https://i.pinimg.com/originals/09/f0/84/09f084cd8a8093ea5738a3ab75c210df.png", linkedin='www.linkedin.com/in/demo-lition-2aa00726b', github='https://github.com/Demo')
    marnie = User(
        first_name='Marnie', last_name='Carnie', username='marnie', email='marnie@aa.io', password='password', pfp="https://i.pinimg.com/originals/09/f0/84/09f084cd8a8093ea5738a3ab75c210df.png", linkedin='www.linkedin.com/in/marnie-carnie-2aa00726b', github='https://github.com/marnie')
    bobbie = User(
        first_name='Bobbie', last_name='Shmobbie', username='bobbie', email='bobbie@aa.io', password='password', pfp="https://i.pinimg.com/originals/09/f0/84/09f084cd8a8093ea5738a3ab75c210df.png", linkedin='www.linkedin.com/in/bobbie-shmobbie-2aa00726b', github='https://github.com/bobbie')
    martyn = User(
        first_name='Martyn', last_name="O'Connor DeLosRios-Roberts", username='Martynodlrr', email='martyn@aa.io', password='password', pfp="https://i.pinimg.com/originals/09/f0/84/09f084cd8a8093ea5738a3ab75c210df.png", linkedin='www.linkedin.com/in/martyn-o-connor-dlr-roberts-2aa00726b', github='https://github.com/Martynodlrr')
    alex = User(
        first_name='Alex', last_name='Lexie', username='alex', email='alex@aa.io', password='password', pfp="https://i.pinimg.com/originals/09/f0/84/09f084cd8a8093ea5738a3ab75c210df.png", linkedin='www.linkedin.com/in/alex-lexie-2aa00726b', github='https://github.com/alex')
    taylor = User(
        first_name='Taylor', last_name='Tailor', username='taylor', email='taylor@aa.io', password='password', pfp="https://i.pinimg.com/originals/09/f0/84/09f084cd8a8093ea5738a3ab75c210df.png", linkedin='www.linkedin.com/in/taylor-tailor-2aa00726b', github='https://github.com/taylor')
    jordan = User(
        first_name='Jordan', last_name='Jordanie', username='jordan', email='jordan@aa.io', password='password', pfp="https://i.pinimg.com/originals/09/f0/84/09f084cd8a8093ea5738a3ab75c210df.png", linkedin='www.linkedin.com/in/jordan-jordanie-2aa00726b', github='https://github.com/jordan')
    morgan = User(
        first_name='Morgan', last_name='Morganie', username='morgan', email='morgan@aa.io', password='password', pfp="https://i.pinimg.com/originals/09/f0/84/09f084cd8a8093ea5738a3ab75c210df.png", linkedin='www.linkedin.com/in/morgan-morganie-2aa00726b', github='https://github.com/morgan')
    casey = User(
        first_name='Casey', last_name='Casie', username='casey', email='casey@aa.io', password='password', pfp="https://i.pinimg.com/originals/09/f0/84/09f084cd8a8093ea5738a3ab75c210df.png", linkedin='www.linkedin.com/in/casey-casie-2aa00726b', github='https://github.com/casey')

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
