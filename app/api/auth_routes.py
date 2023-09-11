from email_validator import validate_email, EmailNotValidError
from flask_login import current_user, login_user, logout_user
from flask import Blueprint, jsonify, session, request
from werkzeug.security import generate_password_hash

from app.api.aws import (upload_file_to_s3, get_unique_filename)
from app.forms import LoginForm, SignUpForm, UpdateUserForm

from app.models import User, db

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []

    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')

    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()

    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)

        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()

    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(
            first_name=form.data['firstName'],
            last_name=form.data['lastName'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            pfp='https://i.pinimg.com/originals/09/f0/84/09f084cd8a8093ea5738a3ab75c210df.png'
        )

        db.session.add(user)
        db.session.commit()
        login_user(user)

        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/<int:id>', methods=['PUT'])
def update_user(id):
    """
    Updates a user based on id
    """
    user = User.query.get(id)

    if not user or current_user.id != user.id:
        return jsonify(error='Unauthorized' if user else 'User not found'), 403 if user else 404

    # Change from request.get_json() to request.form
    form_data = {
        'csrf_token': request.cookies['csrf_token'],
        'firstName': request.form.get('firstName'),
        'lastName': request.form.get('lastName'),
        'userName': request.form.get('userName'),
        'password': request.form.get('password'),
        'linkedin': request.form.get('linkedIn'),
        'github': request.form.get('github'),
        'email': request.form.get('email'),
    }
    form = UpdateUserForm(data=form_data)

    if form_data['email']:
        try:
            email = validate_email(form_data['email'])  # validate and get info
            form_data['email'] = email["email"]  # replace with normalized form
        except EmailNotValidError as e:
            # email is not valid, exception message is human-readable
            return jsonify(errors={'email': [str(e)]}), 400

    if form.validate():
        if 'pfp' in request.files:
            image_file = request.files['pfp']
            upload = upload_file_to_s3(image_file)

            if 'url' not in upload:
                return upload
            else:
                user.pfp = upload['url']
        print(form.github.data, '----------------------------------')

        user.first_name = form.firstName.data if form.firstName.data else user.first_name
        user.last_name = form.lastName.data if form.lastName.data else user.last_name
        user.username = form.userName.data if form.userName.data else user.username
        user.linkedin = form.linkedin.data if form.linkedin.data else user.linkedin
        user.github = form.github.data if form.github.data else user.github
        user.email = form.email.data if form.email.data else user.email
        print(user.github, '++++++++++++++++++++++++++++++++++++++++++++')
        if form.password.data:
            user.hashed_password = generate_password_hash(form.password.data)

        db.session.commit()

        return jsonify(user=user.to_dict())

    return form.errors


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """

    return {'errors': ['Unauthorized']}, 401
