from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, ValidationError
from wtforms.validators import DataRequired, Email
from app.models import User

def credentials_valid(form, field):
    email = form.data['email']
    password = form.data['password']
    user = User.query.filter(User.email == email).first()

    if not user or not user.check_password(password):
        raise ValidationError('Invalid credentials. Please try again.')


class LoginForm(FlaskForm):
    email = StringField('Email Address', validators=[DataRequired(), Email(), credentials_valid])
    password = PasswordField('Password', validators=[DataRequired(), credentials_valid])
