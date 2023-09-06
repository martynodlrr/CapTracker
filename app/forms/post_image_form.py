from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, DateTimeField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileRequired, FileField, FileAllowed
from app.api.aws import ALLOWED_EXTENSIONS

class PostImageForm(FlaskForm):
    url = StringField('URL', validators=[DataRequired(), Length(max=200)])
    post_id = IntegerField('Post ID', validators=[DataRequired()])
    image = FileField('Image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    created_at = DateTimeField('Created At')

    submit = SubmitField('Submit')
