from sqlalchemy.sql import text

from app.models import db, User, environment, SCHEMA

def seed_users():
    users = [
        User(first_name='Demo', last_name='Lition', username='Demo', email='demo@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/demo-lition-2aa00726b', github='https://github.com/Demo'),
        User(first_name='Marnie', last_name='Carnie', username='marnie', email='marnie@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/marnie-carnie-2aa00726b', github='https://github.com/marnie'),
        User(first_name='Bobbie', last_name='Shmobbie', username='bobbie', email='bobbie@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/bobbie-shmobbie-2aa00726b', github='https://github.com/bobbie'),
        User(first_name='Martyn', last_name="O'Connor DeLosRios-Roberts", username='Martynodlrr', email='martyn@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/martyn-o-connor-dlr-roberts-2aa00726b', github='https://github.com/Martynodlrr'),
        User(first_name='Alex', last_name='Lexie', username='alex', email='alex@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/alex-lexie-2aa00726b', github='https://github.com/alex'),
        User(first_name='Taylor', last_name='Tailor', username='taylor', email='taylor@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/taylor-tailor-2aa00726b', github='https://github.com/taylor'),
        User(first_name='Jordan', last_name='Jordanie', username='jordan', email='jordan@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/jordan-jordanie-2aa00726b', github='https://github.com/jordan'),
        User(first_name='Morgan', last_name='Morganie', username='morgan', email='morgan@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/morgan-morganie-2aa00726b', github='https://github.com/morgan'),
        User(first_name='Casey', last_name='Casie', username='casey', email='casey@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/casey-casie-2aa00726b', github='https://github.com/casey'),
         User(first_name='Andy', last_name='Hernandez', username='andyh', email='andyh@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/andy-hernandez', github='https://github.com/andyh'),
        User(first_name='Blake', last_name='Johnson', username='blakej', email='blakej@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/blake-johnson', github='https://github.com/blakej'),
        User(first_name='Cameron', last_name='Lee', username='cameronl', email='cameronl@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/cameron-lee', github='https://github.com/cameronl'),
        User(first_name='Dana', last_name='Kim', username='danak', email='danak@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/dana-kim', github='https://github.com/danak'),
        User(first_name='Ellis', last_name='Patel', username='ellisp', email='ellisp@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/ellis-patel', github='https://github.com/ellisp'),
        User(first_name='Francis', last_name='Zhang', username='francisz', email='francisz@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/francis-zhang', github='https://github.com/francisz'),
        User(first_name='Gerry', last_name='Garcia', username='gerryg', email='gerryg@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/gerry-garcia', github='https://github.com/gerryg'),
        User(first_name='Harley', last_name='Kumar', username='harleyk', email='harleyk@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/harley-kumar', github='https://github.com/harleyk'),
        User(first_name='Indy', last_name='Smith', username='indys', email='indys@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/indy-smith', github='https://github.com/indys'),
        User(first_name='Jesse', last_name='Brown', username='jesseb', email='jesseb@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/jesse-brown', github='https://github.com/jesseb'),
        User(first_name='Kris', last_name='Davis', username='krisd', email='krisd@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/kris-davis', github='https://github.com/krisd'),
        User(first_name='Logan', last_name='Martinez', username='loganm', email='loganm@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/logan-martinez', github='https://github.com/loganm'),
        User(first_name='Mickey', last_name='Taylor', username='mickeyt', email='mickeyt@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/mickey-taylor', github='https://github.com/mickeyt'),
        User(first_name='Nicky', last_name='Anderson', username='nickya', email='nickya@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/nicky-anderson', github='https://github.com/nickya'),
        User(first_name='Olive', last_name='Thompson', username='olivet', email='olivet@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/olive-thompson', github='https://github.com/olivet'),
        User(first_name='Pat', last_name='White', username='patw', email='patw@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/pat-white', github='https://github.com/patw'),
        User(first_name='Quincy', last_name='Harris', username='quincyh', email='quincyh@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/quincy-harris', github='https://github.com/quincyh'),
        User(first_name='Riley', last_name='Clark', username='rileyc', email='rileyc@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/47c901f3e6e94f1d88d65ad788341bd2.jpg", linkedin='www.linkedin.com/in/riley-clark', github='https://github.com/rileyc')
    ]

    db.session.add_all(users)
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
