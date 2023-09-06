from flask import Flask
from app.api import review_routes

app = Flask(__name__)


app.register_blueprint(review_routes, url_prefix='/api/reviews')

app.route('/')
def index():
  return '<h1>Wow what a cool website</h1>'
