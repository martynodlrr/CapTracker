from flask_wtf.file import FileRequired, FileField, FileAllowed
from wtforms import StringField, PasswordField, ValidationError
from wtforms.validators import DataRequired, Length, Optional
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


class UpdateUserForm(FlaskForm):
    firstName = StringField('First Name', validators=[DataRequired(), Length(min=2, max=25)])
    lastName = StringField('Last Name', validators=[DataRequired(), Length(min=2, max=50)])
    userName = StringField('Username', validators=[Optional(), Length(min=4, max=40), username_exists])
    email = StringField('Email Address', validators=[Optional(), Length(max=75), user_exists])
    password = PasswordField('Password', validators=[Optional(), Length(min=6)])
    pfp = FileField('Profile Picture', validators=[FileAllowed(list(ALLOWED_EXTENSIONS)), Optional()])
