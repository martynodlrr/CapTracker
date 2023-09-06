from flask import Blueprint

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def index():
  return '<h1>Wow what a cool website</h1>'


# @review_routes.route('/')
# def reviews():
#     """
#     Fetches all reviews by restaurant id and returns the list of reviews in a dictionary
#     """
#     reviews = Review.query.all()


#     return json.dumps({'reviews': [review.to_dict() for review in reviews]})


# @review_routes.route('/restaurants/<int:restaurantId>')
# def reviews_by_restaurant_id(restaurantId):
#     reviews = Review.query.filter_by(restaurant_id=restaurantId).all()
#     data = []

#     for review in reviews:
#         user = User.query.get(review.user_id)
#         if user:
#             review_data = review.to_dict()
#             review_data['username'] = user.username  # Add username as an attribute
#             data.append(review_data)

#     if not reviews:
#         return json.dumps({'message': 'Restaurant has no reviews'}), 404

#     return json.dumps({'reviews': data})


# @review_routes.route('/restaurants/<int:restaurantId>', methods=['POST'])
# def create_review(restaurantId):
#     """
#     Creates a review based on restaurant id and returns that review in a dictionary
#     """
#     data = request.get_json()
#     form = ReviewForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         new_review = Review(
#             body=form.data['body'],
#             rating=form.data['rating'],
#             user_id=data['user_id'],
#             restaurant_id=restaurantId
#         )
#         db.session.add(new_review)
#         db.session.commit()

#         return json.dumps([{'review': new_review.to_dict()}]), 201

#     if form.errors:
#         return form.errors


# @review_routes.route('/<int:id>', methods=['PUT'])
# def update_review(id):
#     """
#     Updates a review and returns that updated review in a dictionary
#     """
#     review = Review.query.get(id)

#     if not review:
#         return jsonify({'message': 'Review not found'}), 404

#     form = ReviewForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         review.body = form.data['body']
#         review.rating = form.data['rating']

#         db.session.commit()
#         return json.dumps([{'review': review.to_dict()}])

#     if form.errors:
#         return form.errors


# @review_routes.route('/<int:id>', methods=['DELETE'])
# def delete_review(id):
#     """
#     Deletes a review based on review id
#     """
#     review = Review.query.get(id)

#     if not review:
#         return json.dumps({'message': 'Review not found'}), 404

#     if review:
#         db.session.delete(review)
#         db.session.commit()
#         return json.dumps([{'message': 'Review deleted successfully'}]), 200

#     return json.dumps([{'message': 'Review not found'}]), 404
