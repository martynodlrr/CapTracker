from flask_login import login_required
from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from datetime import datetime

from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws import (upload_file_to_s3, get_unique_filename)
from app.forms import CapstoneForm, CapstoneImageForm
from app.models import Capstone, CapstoneImage, db

capstone_routes = Blueprint('capstones', __name__)


@capstone_routes.route('/', methods=['GET'])
def capstones():
    """
    Query for 10 capstones at a time and returns them in a list of capstone dictionaries
    """
    number = int(request.args.get('number', 1))
    limit = 10
    offset = (number - 1) * limit

    capstones = Capstone.query.order_by(Capstone.created_at.desc()).offset(offset).limit(limit).all()

    if not capstones and number != 1:
        return jsonify(error="No more capstones"), 404

    data = [capstone.to_dict() for capstone in capstones]
    return jsonify(capstones=data), 200


@capstone_routes.route('/user/<string:userId>')
def capstones_by_user_id(userId):
    """
    Query for capstones by user ID and return that capstone in a list
    """
    capstone = Capstone.query.filter(Capstone.user_id == userId).first()

    if not capstone:
        return jsonify(message='User has no capstone'), 404

    return jsonify(capstone=capstone.to_dict())


@capstone_routes.route('/<int:capstoneId>')
def capstone_by_id(capstoneId):
    """
    Query for one capstone and returns that capstone in a dictionary
    """
    capstone = Capstone.query.get(capstoneId)

    if not capstone:
        return jsonify(message='Capstone could not be found'), 404

    return jsonify(capstone=capstone.to_dict())


@capstone_routes.route('/', methods=['POST'])
def create_capstone():
    """
    Create a capstone
    """
    data = request.get_json()
    form = CapstoneForm(csrf_token=request.cookies['csrf_token'], data=data)

    if form.validate():
        new_capstone = Capstone(
            url=form.url.data,
            title=form.title.data,
            user_id=data['userId'],
            cloned_from=form.cloned_from.data,
            description=form.description.data,
            created_at=datetime.utcnow()
        )
        db.session.add(new_capstone)
        db.session.commit()

        return jsonify(capstone=new_capstone.to_dict()), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@capstone_routes.route('/<int:capstoneId>/user/<string:userId>', methods=['POST'])
def create_image_for_capstone(capstoneId, userId):
    """
    Create an image for capstone by capstone id
    """
    image_file = request.files.get('image')

    if not image_file:
        return jsonify(error="No image file provided"), 400

    data = {
        "image_file": image_file
    }

    form = CapstoneImageForm(csrf_token=request.cookies['csrf_token'], data=data)

    if form.validate():
        upload = upload_file_to_s3(image_file)

        if 'url' not in upload:
            return jsonify(error="Failed to upload image"), 500

        image_url = upload['url']

        new_capstone_image = CapstoneImage(
            image_url=image_url,
            user_id=userId,
            capstone_id=capstoneId,
            created_at=datetime.utcnow()
        )

        db.session.add(new_capstone_image)
        db.session.commit()

        return jsonify(capstoneImage=new_capstone_image.to_dict()), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@capstone_routes.route('/<int:capstoneId>', methods=['PUT'])
def update_capstone(capstoneId):
    """
    Updates a capstone by capstone id
    """
    capstone = Capstone.query.get(capstoneId)

    if not capstone:
        return jsonify(error='Capstone not found'), 404

    form = CapstoneForm(csrf_token=request.cookies['csrf_token'], data=request.get_json())

    if form.validate():
        capstone.title = form.title.data
        capstone.url = form.url.data
        capstone.cloned_from = form.cloned_from.data
        capstone.description = form.description.data

        db.session.commit()

        return jsonify(capstone=capstone.to_dict())

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@capstone_routes.route('/<int:_capstoneId>/images/<int:imageId>', methods=['PUT'])
def update_capstone_image(_capstoneId, imageId):
    """
    Updates a capstone image by capstone id and image id
    """
    capstone_image = CapstoneImage.query.get(imageId)

    if not capstone_image:
        return jsonify(error='Image Not Found'), 404

    image_file = request.files.get('image')
    form = CapstoneImageForm(csrf_token=request.cookies['csrf_token'], formdata=request.files)

    if form.validate():
        upload = upload_file_to_s3(image_file)

        if 'url' not in upload:
            return upload

        capstone_image.image_url = upload['url']

        db.session.commit()

        return jsonify(capstoneImage=capstone_image.to_dict()), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@capstone_routes.route('/<int:capstoneId>', methods=['DELETE'])
def delete_capstone(capstoneId):
    """
    deletes a capstone by capstone id
    """
    capstone = Capstone.query.get(capstoneId)

    if not capstone:
        return jsonify(error='Capstone not found'), 404

    capstone_images = CapstoneImage.query.filter_by(capstone_id=capstoneId).all()

    for capstone_image in capstone_images:
        db.session.delete(capstone_image)

    db.session.delete(capstone)
    db.session.commit()

    return jsonify(message='Capstone and associated images deleted successfully'), 200
