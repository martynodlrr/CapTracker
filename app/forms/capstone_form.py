from wtforms import StringField, IntegerField, SubmitField, TextAreaField, DateTimeField
from wtforms.validators import DataRequired, Length, URL
from flask_wtf import FlaskForm

from app.api.aws import ALLOWED_EXTENSIONS

class CapstoneForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=50)])
    url = StringField('URL', validators=[URL(), Length(max=150)])
    cloned_from = StringField('Cloned From', validators=[DataRequired(), Length(max=75)])
    description = TextAreaField('Description', validators=[DataRequired(), Length(max=200)])

    submit = SubmitField('Submit')
