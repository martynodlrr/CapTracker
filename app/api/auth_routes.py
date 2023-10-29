# from email_validator import validate_email, EmailNotValidError
# from flask_login import current_user, login_user, logout_user
# from flask import Blueprint, jsonify, session, request
# from werkzeug.security import generate_password_hash

# from app.api.aws import upload_file_to_s3, get_unique_filename
# from app.forms import LoginForm, SignUpForm, UpdateUserForm

# from app.models import User, db

# auth_routes = Blueprint("auth", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []

    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")

    return errorMessages


# @auth_routes.route("/")
# def authenticate():
#     """
#     Authenticates a user.
#     """
#     if current_user.is_authenticated:
#         return current_user.to_dict()

#     return {"errors": ["Unauthorized"]}


# @auth_routes.route("/login", methods=["POST"])
# def login():
#     """
#     Logs a user in
#     """
#     form = LoginForm()
#     # Get the csrf_token from the request cookie and put it into the
#     # form manually to validate_on_submit can be used
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if form.validate_on_submit():
#         # Add the user to the session, we are logged in!
#         user = User.query.filter(User.email == form.data["email"]).first()
#         login_user(user)

#         return user.to_dict()

#     return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# @auth_routes.route("/logout")
# def logout():
#     """
#     Logs a user out
#     """
#     logout_user()

#     return {"message": "User logged out"}


# @auth_routes.route("/signup", methods=["POST"])
# def sign_up():
#     """
#     Creates a new user and logs them in
#     """
#     form = SignUpForm(csrf_token=request.cookies["csrf_token"], data=request.get_json())

#     if form.validate_on_submit():
#         user = User(
#             given_name=form.data["given_name"],
#             family_name=form.data["family_name"],
#             nick_name=form.data["nick_name"],
#             email=form.data["email"],
#             password=form.data["password"],
#             picture="https://captracker.s3.amazonaws.com/1d7d56d0457448ecb26a3bbcc6a7ec70.png",
#         )

#         db.session.add(user)
#         db.session.commit()
#         login_user(user)

#         return user.to_dict()

#     return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# @auth_routes.route("/<int:id>", methods=["PUT"])
# def update_user(id):
#     """
#     Updates a user based on id
#     """
#     user = User.query.get(id)

#     if not user or current_user.id != user.id:
#         return (
#             jsonify(error="Unauthorized" if user else "User not found"),
#             403 if user else 404,
#         )

#     # Change from request.get_json() to request.form
#     form_data = {
#         "csrf_token": request.cookies["csrf_token"],
#         "given_name": request.form.get("given_name"),
#         "family_name": request.form.get("family_name"),
#         "nick_name": request.form.get("nick_name"),
#         "linkedin": request.form.get("linkedIn"),
#         "github": request.form.get("github"),
#         "email": request.form.get("email"),
#     }
#     if request.form.get("password"):
#         form_data["password"] = request.form.get("password")

#     form = UpdateUserForm(data=form_data)

#     if form_data["email"]:
#         try:
#             email = validate_email(form_data["email"])  # validate and get info
#             form_data["email"] = email["email"]  # replace with normalized form
#         except EmailNotValidError as e:
#             # email is not valid, exception message is human-readable
#             return jsonify(errors={"email": [str(e)]}), 400

#     if form.validate():
#         if "picture" in request.files:
#             image_file = request.files["picture"]
#             upload = upload_file_to_s3(image_file)

#             if "url" not in upload:
#                 return upload
#             else:
#                 user.picture = upload["url"]

#         user.given_name = (
#             form.given_name.data if form.given_name.data else user.given_name
#         )
#         user.family_name = (
#             form.family_name.data if form.family_name.data else user.family_name
#         )
#         user.nick_name = form.nick_name.data if form.nick_name.data else user.nick_name
#         user.linkedin = form.linkedin.data if form.linkedin.data else user.linkedin
#         user.github = form.github.data if form.github.data else user.github
#         user.email = form.email.data if form.email.data else user.email

#         if form.password.data:
#             user.hashed_password = generate_password_hash(form.password.data)

#         db.session.commit()

#         return jsonify(user=user.to_dict())

#     return form.errors


# @auth_routes.route("/unauthorized")
# def unauthorized():
#     """
#     Returns unauthorized JSON when flask-login authentication fails
#     """

#     return {"errors": ["Unauthorized"]}, 401
