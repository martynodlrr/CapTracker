from flask_wtf.file import FileAllowed
from wtforms import StringField, PasswordField, ValidationError
from wtforms.validators import DataRequired, Email, Length
from flask_wtf import FlaskForm

from app.api.aws import ALLOWED_EXTENSIONS
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(), Length(min=2, max=25)])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(min=2, max=50)])
    username = StringField('Username', validators=[DataRequired(), Length(min=4, max=40), username_exists])
    email = StringField('Email Address', validators=[DataRequired(), Email(), Length(max=75), user_exists])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
