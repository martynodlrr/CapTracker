from wtforms import TextAreaField, SubmitField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Length
from flask_wtf import FlaskForm

class ReviewForm(FlaskForm):
    user_id = IntegerField('User ID')
    comment = TextAreaField('Comment', validators=[DataRequired(), Length(max=1000)])
    created_at = DateTimeField('Created At')

    submit = SubmitField('Submit')
