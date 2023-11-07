import { ThemeProvider, useTheme } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

import * as reviewActions from '../../../store/review';
import OpenModalButton from '../../OpenModalButton';
import { useModal } from "../../../context/Modal";
import CreateReview from '../CreateReview';

import './index.css';

function ReviewRender({ create, capstoneId, ownerId, capstoneAlter }) {
  const reviews = useSelector(state => state.reviews);
  const [showMenu, setShowMenu] = useState(false);
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const theme = useTheme();
  const ulRef = useRef();

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (!create &&capstoneId) {
      dispatch(reviewActions.getReviews(capstoneId));
    }
  }, [dispatch, capstoneId])

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  if (create) {
    return <p
      className='heading'
      style={{
        marginBottom: '100px'
      }}
    >Post your capstone to see reviews here!</p>
  }

  const userHasReviewCheck = reviews => {
    return Object.values(reviews).some(review => user.nickname === review.author);
  }

  const handleDelete = async reviewId => {
    await dispatch(reviewActions.deleteReview(reviewId))
  }

  return (
    <>
      <section className="review-section">
        {(user.id != ownerId && !userHasReviewCheck(reviews) && !capstoneAlter) && <OpenModalButton
          buttonText="Leave constructive criticism"
          onItemClick={closeMenu}
          modalComponent={
            <ThemeProvider theme={theme}>
              <CreateReview create={true} capstoneId={capstoneId} closeModal={closeModal} nickname={user.nickname} />
            </ThemeProvider>
          } />}
        {user.id === ownerId && !capstoneAlter && <Button
          variant='contained'
          href='/capstone/edit'
          >Edit Capstone</Button>}
      </section>

      {(!Object.values(reviews).length) &&
        <p
          className='heading'
          style={{
            marginBottom: '100px'
          }}
        >Capstone currently has no reviews</p>
      }

      <div
        className="review-render"
        style={capstoneAlter ? { justifyContent: 'center' } : null}
      >

        <section
          className="review-list"
          ref={ulRef}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap'
          }}
        >
          {Object.values(reviews).reverse().map((review, index) => (
            <div key={index} className="review">
              <p><strong>{review.author}</strong>: {review.comment}</p>
              <p>{new Date(review.createdAt).toLocaleDateString()}</p>
              {review.author === user.nickname ? (
                <>
                  <OpenModalButton
                    buttonText="Edit"
                    onItemClick={closeMenu}
                    modalComponent={
                      <ThemeProvider theme={theme}>
                        <CreateReview nickname={user.nickname} capstoneId={capstoneId} closeModal={closeModal} reviewId={review.id} text={review.comment} />
                      </ThemeProvider>
                    }
                  />

                  <Button
                    onClick={() => handleDelete(review.id)}
                    className='btn'
                    variant='contained'
                  >Delete</Button>
                </>
              ) : null}

            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default ReviewRender;
