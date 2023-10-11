import { Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import ReactGA from 'react-ga';

import StyledTextareaAutosize from '../../TextareaInput/index.tsx';
import * as reviewActions from '../../../store/review';

import './index.css';

function CreateReview({ create, capstoneId, closeModal, reviewId, text }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [review, setReview] = useState(!create ? text : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    ReactGA.event({
      category: 'Review',
      action: 'Submitted a review',
    });

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
    <Container
      style={{
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '10px',
        padding: '20px 10px',
      }}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" id='capstone-form'>
        <div className="form-field">
          <StyledTextareaAutosize
            label="Review"
            variant="filled"
            onChange={(e) => setReview(e.target.value)}
            value={review}
            required
            maxLength={1000}
            style={{
              maxWidth: '1100px'
            }}
            placeholder='Write your review here'
          />
        </div>

        <Button
          type="submit"
          variant='outlined'
          className='btn'
        >{create ? 'post' : 'update'}</Button>
      </form>
    </Container>
  );
}

export default CreateReview;
