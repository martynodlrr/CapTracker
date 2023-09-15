from flask_login import current_user, login_required
from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from datetime import datetime

from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Review, Capstone, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/capstones/<int:capstoneId>')
def reviews_by_capstone_id(capstoneId):
    """
    Query for all reviews of a capstone and returns them in a list dictionaries
    """
    reviews = Review.query.options(joinedload(Review.reviewer)).filter_by(capstone_id=capstoneId).order_by(Review.created_at.desc()).all()

    if not reviews:
        return jsonify(message='Capstone has no reviews'), 404

    data = [
        {**review.to_dict(), 'user': review.reviewer.to_dict()}
        for review in reviews if review.reviewer
    ]

    return jsonify(reviews=data)


@review_routes.route('/capstones/<int:capstoneId>', methods=['POST'])
@login_required
def create_review(capstoneId):
    """
    Create a review
    """
    capstone = Capstone.query.get(capstoneId)

    if not capstone or current_user.id == capstone.user_id:
        return jsonify(error='Cannot comment on your own capstone!' if capstone else 'Capstone not found'), 403 if capstone else 404

    data = request.get_json()
    form = ReviewForm(csrf_token=request.cookies['csrf_token'], data=data)

    if form.validate():
        new_review = Review(
            comment=data['comment'],
            user_id=current_user.id,
            capstone_id=capstoneId,
            created_at=datetime.utcnow()
        )

        db.session.add(new_review)
        db.session.commit()

        return jsonify(review=new_review.to_dict()), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def update_review(reviewId):
    """
    Updates a review
    """
    review = Review.query.get(reviewId)

    if not review or current_user.id != review.user_id:
        return jsonify(error='Unauthorized' if review else 'Review not found'), 403 if review else 404

    form = ReviewForm(csrf_token=request.cookies['csrf_token'], data=request.get_json())

    if form.validate():
        review.comment = form.comment.data
        db.session.commit()

        return jsonify(review=review.to_dict())

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    """
    deletes a review
    """
    review = Review.query.get(reviewId)

    if not review or current_user.id != review.user_id:
        return jsonify(error='Unauthorized' if review else 'Review not found'), 403 if review else 404

    db.session.delete(review)
    db.session.commit()

    return jsonify(message='Review deleted successfully'), 200
