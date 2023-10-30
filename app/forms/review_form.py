from wtforms import TextAreaField, SubmitField, StringField, DateTimeField
from wtforms.validators import DataRequired, Length
from flask_wtf import FlaskForm

class ReviewForm(FlaskForm):
    comment = TextAreaField('Comment', validators=[DataRequired(), Length(max=1000)])
    created_at = DateTimeField('Created At')

    submit = SubmitField('Submit')
