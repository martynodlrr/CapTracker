from flask_login import current_user, login_required
from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from datetime import datetime
from app.api.aws import (upload_file_to_s3, get_unique_filename)
from app.models import Review, Capstone, CapstoneImage, db
from app.forms import CapstoneForm

capstone_routes = Blueprint('capstones', __name__)


@capstone_routes.route('/')
def capstones():
    """
    Query for all capstones and returns them in a list of capstone dictionaries
    """
    capstones = Capstone.query.all()
    data = [
        {
            **capstone.to_dict(),
        }
        for capstone in capstones
    ]
    return jsonify(capstones=data), 200


@capstone_routes.route('/<int:capstoneId>')
def capstone_by_id(capstoneId):
    """
    Query for one capstone and returns that capstone in a dictionary
    """
    capstone = Capstone.query.get(capstoneId)

    if not capstone:
        return jsonify(message='Capstone could not be found'), 404

    return jsonify(reviews=capstone.to_dict())


@capstone_routes.route('/', methods=['POST'])
@login_required
def create_capstone():
    """
    Create a capstone
    """
    data = request.get_json()
    form = CapstoneForm(csrf_token=request.cookies['csrf_token'], data=data)

    if form.validate():
        new_capstone = Capstone(
            title=form.title.data,
            url=form.url.data,
            description=form.description.data,
            user_id=current_user.id,
            created_at=datetime.utcnow()
        )
        db.session.add(new_capstone)
        db.session.commit()

        return jsonify(review=new_capstone.to_dict()), 201

    return form.errors


@capstone_routes.route('/<int:capstoneId>', methods=['POST'])
@login_required
def create_image_for_capstone(capstoneId):
    """
    Create an image for capstone by capstone id
    """
    image_file = request.files.get('image')
    upload = upload_file_to_s3(image_file)

    if 'url' not in upload:
        return upload

    capstone_id = capstoneId
    image_url = upload['url']
    created_at = datetime.utcnow()
    data = {
        "image_url": image_url,
        "created_at": created_at,
        "capstone_id": capstone_id
    }
    form = CapstoneForm(csrf_token=request.cookies['csrf_token'], data=data)

    if form.validate():
        new_capstone_image = CapstoneImage(
            capstone_id=capstone_id,
            image_url=image_url,
            user_id=current_user.id,
            created_at=created_at
        )

        db.session.add(new_capstone_image)
        db.session.commit()

        return jsonify(review=new_capstone_image.to_dict()), 201

    return form.errors


@capstone_routes.route('/<int:capstoneId>', methods=['PUT'])
@login_required
def update_capstone(capstoneId):
    """
    Updates a capstone by capstone id
    """
    capstone = Capstone.query.get(capstoneId)

    if not capstone or current_user.id != capstone.user_id:
        return jsonify(error='Unauthorized' if capstone else 'Capstone not found'), 403 if capstone else 404

    form = CapstoneForm(csrf_token=request.cookies['csrf_token'], data=request.get_json())

    if form.validate():
        capstone.title = form.title.data
        capstone.url = form.url.data
        capstone.description = form.description.data

        db.session.commit()

        return jsonify(capstone=capstone.to_dict())

    return form.errors


@capstone_routes.route('/<int:capstoneId>/images/<int:imageId>', methods=['PUT'])
@login_required
def update_capstone_image(capstoneId, imageId):
    """
    Updates a capstone image by capstone id and image id
    """
    capstone_image = CapstoneImage.query.get(imageId)

    if not capstone_image or current_user.id != capstone_image.user_id:
        return jsonify(error='Unauthorized'), 403

    image_file = request.files.get('image')
    form = CapstoneForm(csrf_token=request.cookies['csrf_token'], data=image_file)

    if form.validate():
        upload = upload_file_to_s3(image_file)

        if 'url' not in upload:
            return upload

        image_url = upload['url']
        capstone_image = CapstoneImage.query.get(imageId)
        capstone_image.image_url = image_url

        db.session.commit()

        return jsonify(capstoneImage=capstone_image.to_dict()), 201

    return form.errors


@capstone_routes.route('/<int:capstoneId>', methods=['DELETE'])
@login_required
def delete_capstone(capstoneId):
    """
    deletes a capstone by capstone id
    """
    capstone = Capstone.query.get(capstoneId)

    if not capstone or current_user.id != capstone.user_id:
        return jsonify(error='Unauthorized' if capstone else 'Capstone not found'), 403 if capstone else 404

    db.session.delete(capstone)
    db.session.commit()

    return jsonify(message='Capstone deleted successfully'), 200


@capstone_routes.route('/<capstoneId>/images/<int:capstoneImageId>', methods=['DELETE'])
@login_required
def delete_capstone_image(capstoneImageId):
    """
    deletes a capstone image by capston image id
    """
    capstone_image = CapstoneImage.query.get(capstoneImageId)

    if not capstone_image or current_user.id != capstone_image.user_id:
        return jsonify(error='Unauthorized' if capstone_image else 'Capstone image not found'), 403 if capstone_image else 404

    db.session.delete(capstone_image)
    db.session.commit()

    return jsonify(message='Capstone image deleted successfully'), 200