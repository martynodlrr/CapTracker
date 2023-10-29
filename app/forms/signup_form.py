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
        raise ValidationError("Email address is already in use.")


def nick_name_exists(form, field):
    # Checking if nick_name is already in use
    nick_name = field.data
    user = User.query.filter(User.nick_name == nick_name).first()
    if user:
        raise ValidationError("nick_name is already in use.")


class SignUpForm(FlaskForm):
    given_name = StringField(
        "First Name", validators=[DataRequired(), Length(min=2, max=25)]
    )
    family_name = StringField(
        "Last Name", validators=[DataRequired(), Length(min=2, max=50)]
    )
    nick_name = StringField(
        "nick_name",
        validators=[DataRequired(), Length(min=4, max=40), nick_name_exists],
    )
    email = StringField(
        "Email Address",
        validators=[DataRequired(), Email(), Length(max=75), user_exists],
    )
    password = PasswordField("Password", validators=[DataRequired(), Length(min=6)])
