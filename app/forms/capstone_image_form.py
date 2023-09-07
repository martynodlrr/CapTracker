from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, DateTimeField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileRequired, FileField, FileAllowed
from app.api.aws import ALLOWED_EXTENSIONS

class CapstoneImageForm(FlaskForm):
    capstone_id = IntegerField('Capstone ID')
    image_url = FileField('Image Url', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    created_at = DateTimeField('Created At')

    submit = SubmitField('Submit')
