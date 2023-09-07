from flask_login import current_user, login_required
from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from datetime import datetime
from app.models import Review, Post, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/capstones/<int:capstoneId>')
def reviews_by_post_id(capstoneId):
    reviews = Review.query.options(joinedload(Review.reviewer)).filter_by(post_id=capstoneId).all()
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
    post = Post.query.get(capstoneId)
    if not post or current_user.id == post.user_id:
        return jsonify(error='Cannot comment on your own post!' if post else 'Post not found'), 403 if post else 404

    data = request.get_json()
    form = ReviewForm(csrf_token=request.cookies['csrf_token'], data=data)

    if form.validate():
        new_review = Review(
            comment=form.comment.data,
            user_id=current_user.id,
            post_id=capstoneId,
            created_at=datetime.utcnow()
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify(review=new_review.to_dict()), 201

    return form.errors


@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def update_review(reviewId):
    review = Review.query.get(reviewId)
    if not review or current_user.id != review.user_id:
        return jsonify(error='Unauthorized' if review else 'Review not found'), 403 if review else 404

    form = ReviewForm(csrf_token=request.cookies['csrf_token'], data=request.get_json())

    if form.validate():
        review.comment = form.comment.data
        db.session.commit()
        return jsonify(review=review.to_dict())

    return form.errors


@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    review = Review.query.get(reviewId)
    if not review or current_user.id != review.user_id:
        return jsonify(error='Unauthorized' if review else 'Review not found'), 403 if review else 404

    db.session.delete(review)
    db.session.commit()
    return jsonify(message='Review deleted successfully'), 200
