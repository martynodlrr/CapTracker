import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

import * as reviewActions from '../../../store/review';

import './index.css';

function CreateReview({ create, capstoneId, closeModal, reviewId, text }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState(!create ? text : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const comment = {
      review,
    };

    if (create) {
      await dispatch(reviewActions.createReview(comment, capstoneId));
    } else {
      comment['id'] = reviewId
      await dispatch(reviewActions.postUpdateReview(comment))
    }

    closeModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data" id='capstone-form'>
        <div className="form-field">
          <label htmlFor="review" className='review-label'>Constructive Criticism: </label>
          <input
            id="review"
            className='review-input'
            type="textbox"
            onChange={(e) => setReview(e.target.value)}
            value={review}
            placeholder="Review"
            required
          />
        </div>

        <button type="submit" className="form-submit" >{ create ? 'post' : 'update' }</button>
      </form>
    </>
  );
}

export default CreateReview;
