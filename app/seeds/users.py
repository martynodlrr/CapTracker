from sqlalchemy.sql import text

from app.models import db, User, environment, SCHEMA

def seed_users():
    users = [
        User(first_name='Lee', last_name='Byung-chul', username='LeeByung-chul', email='lee.byungchul@samsung.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png"),
        User(first_name='Micro', last_name='Soft', username='Microsoft', email='contact@microsoft.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/company/microsoft/', github='https://github.com/microsoft'),
        User(first_name='Jerry', last_name='Yang', username='JerryYang', email='jerry@yahoo.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/chenyang/'),
        User(first_name='Jeff', last_name='Bezos', username='JeffBezos', email='jeff@amazon.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png"),
        User(first_name='Pierre', last_name='Omidyar', username='PierreOmidyar', email='privacy@omidyar.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/pierre-omidyar-bb10687b/'),
        User(first_name='Reed', last_name='Hastings', username='ReedHastings', email='reed.hastings@netflix.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/reedhastings/'),
        User(first_name='Larry', last_name='Page', username='LarryPage', email='larrypage@google.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/larry-page-555530154/'),
        User(first_name='Jimmy', last_name='Wales', username='JimmyWales', email='jwales@wikimedia.org', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/jimmy-wales-919a8b/?originalSubdomain=uk'),
        User(first_name='Reid', last_name='Hoffman', username='ReidHoffman', email='rhoffman@linkedin.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/reidhoffman/'),
        User(first_name='Mark', last_name='Zuckerberg', username='MarkZuckerberg', email='zuck@fb.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/mark-zuckerberg-618bba58/', github='https://github.com/mark-zuckerberg'),
        User(first_name='Alexis', last_name='Ohanian', username='AlexisOhanian', email='press@alexisohanian.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/alexisohanian/'),
        User(first_name='Chad', last_name='Hurley', username='ChadHurley', email='chadhurley@gmail.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/chadhurley/', github='https://github.com/hurlex'),
        User(first_name='Jack', last_name='Dorsey', username='JackDorsey', email='jack@twitter.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/jack-dorsey-a43b07242/'),
        User(first_name='David', last_name='Baszucki', username='DavidBaszucki', email='info@roblox.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/davidbaszucki/'),
        User(first_name='Gabriel', last_name='Weinberg', username='GabrielWeinberg', email='GabrielWeinberg@duckduckgo.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/yegg13/', github='https://github.com/yegg'),
        User(first_name='Soft', last_name='Micro', username='SoftMicro', email='contact@softmicro.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/company/microsoft/', github='https://github.com/microsoft'),
        User(first_name='Adam', last_name="D'Angelo", username='AdamDAngelo', email='adam@quora.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/dangelo/', github='https://github.com/adamdangelo'),
        User(first_name='Kevin', last_name='Systrom', username='KevinSystrom', email='kevin@instagram.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/kevinsystrom/'),
        User(first_name='Eric', last_name='Yuan', username='EricYuan', email='eric.yuan@zoom.us', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/ericsyuan/', github='https://github.com/xingdi-eric-yuan'),
        User(first_name='Emmett', last_name='Shear', username='EmmettShear', email='emmett@twitch.tv', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/emmettshear/', github='https://github.com/eshear'),
        User(first_name='Jason', last_name='Citron', username='JasonCitron', email='jason@discordapp.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/jasoncitron/', github='https://github.com/jasoncitron'),
        User(first_name='Sam', last_name='Altman', username='SamAltman', email='sama@openai.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/sam-altman-4384094/'),
        User(first_name='Zhang', last_name='Yiming', username='ZhangYiming', email='zhang@tiktok.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png"),
        User(first_name='John', last_name='Coleman', username='JohnColeman', email='john.coleman@weather.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png"),
        User(first_name='Satya', last_name='Nadella', username='SatyaNadella', email='Satya.Nadella@Microsoft.com', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='https://www.linkedin.com/in/satyanadella/', github='https://github.com/satyanadella'),
        User(first_name='Martyn', last_name="O'Connor DeLosRios-Roberts", username='Martynodlrr', email='martynodlrr@gmail.com', password='noOneKnowsThis', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='www.linkedin.com/in/martyn-o-connor-dlr-roberts-2aa00726b', github='https://github.com/Martynodlrr'),
        User(first_name='Demo', last_name='Lition', username='Demo', email='demo@aa.io', password='password', pfp="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png", linkedin='www.linkedin.com/in/demo-lition-2aa00726b', github='https://github.com/Demo')
    ]

    for user in users:
        db.session.add(user)
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
