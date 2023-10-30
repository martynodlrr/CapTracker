from wtforms import StringField, SubmitField
from flask_wtf.file import FileRequired, FileField, FileAllowed
from wtforms.validators import DataRequired, Length
from flask_wtf import FlaskForm

from app.api.aws import ALLOWED_EXTENSIONS

class CapstoneImageForm(FlaskForm):
    image = FileField('Image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])

    submit = SubmitField('Submit')
