from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, TextAreaField, DateTimeField
from wtforms.validators import DataRequired, Length, URL
from app.api.aws import ALLOWED_EXTENSIONS

class CapstoneForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=50)])
    url = StringField('URL', validators=[URL(), Length(max=150)])
    description = TextAreaField('Description', validators=[DataRequired(), Length(max=200)])
    user_id = IntegerField('Author ID')
    created_at = DateTimeField('Created At')

    submit = SubmitField('Submit')
