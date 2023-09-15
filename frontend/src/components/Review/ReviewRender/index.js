import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as reviewActions from '../../../store/review';
import OpenModalButton from '../../OpenModalButton';
import { useModal } from "../../../context/Modal";
import CreateReview from '../CreateReview';

function ReviewRender({ ownerId, create, capstoneId }) {
  const userCapstone = useSelector((state) => state.capstones.userCapstone);
  const user = useSelector(state => state.session.user);
  const reviews = useSelector(state => state.reviews)
  const [showMenu, setShowMenu] = useState(false);
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const ulRef = useRef();
  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {

    if (userCapstone && Object.values(userCapstone).length) {
      if (!Object.values(reviews).length) {
        dispatch(reviewActions.getReviews(userCapstone.id));
      }
    } else {
      if (!Object.values(reviews).length) {
        dispatch(reviewActions.getReviews(capstoneId));
      }
    }
  }, [dispatch, reviews, userCapstone])

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
    return <p>Post your capstone to see reviews here!</p>
  }

  if (!Object.values(reviews).length) {
    return <p>Capstone currently has no reviews</p>
  }

  const userHasReviewCheck = reviews => {
    return Object.values(reviews).some(review => user.id === review.author.id);
  }

  const handleEdit = reviews => {
    return reviews.some(review => user.id === review.author.id);
  }

  const handleDelete = async reviewId => {
    await dispatch(reviewActions.deleteReview(reviewId))
  }

  return (
    <div>
      <section>
        {user.id !== ownerId && !userHasReviewCheck(reviews) && <OpenModalButton
          buttonText="Leave constructive criticism"
          onItemClick={closeMenu}
          modalComponent={<CreateReview create={true} capstoneId={capstoneId} closeModal={closeModal} />}
        />}
      </section>

      <section ref={ulRef}>
        {Object.values(reviews).map((review, index) => (
          <div key={index}>
            <p>{review.author.userName}: {review.comment}</p>
            <p>{new Date(review.createdAt).toLocaleDateString()}</p>
            {review.author.id === user.id ? (
              <>
                <OpenModalButton
                  buttonText="Edit"
                  onItemClick={closeMenu}
                  modalComponent={<CreateReview capstoneId={capstoneId} closeModal={closeModal} reviewId={review.id} text={ review.comment } />}
                />
                <button onClick={() => handleDelete(review.id)}>Delete</button>
              </>
            ) : null}
          </div>
        ))}
      </section>
    </div>
  );
}

export default ReviewRender;
