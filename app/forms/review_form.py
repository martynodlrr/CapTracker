from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
    user_id = IntegerField('User ID')
    comment = TextAreaField('Comment', validators=[DataRequired(), Length(max=200)])
    created_at = DateTimeField('Created At')

    submit = SubmitField('Submit')
