import { useSelector } from 'react-redux';
import React from 'react';

function ReviewRender({ reviews, ownerId, create }) {
  const user = useSelector(state => state.session.user);

  if (create) {
    return <p>Post your capstone to see reviews here!</p>
  }

  if (!reviews?.length) {
    return <p>Capstone currently has no reviews</p>
  }

  const userHasReviewCheck = reviews => {
    return reviews.some(review => user.id === review.author.id);
  }

  return (
    <div>
      <section>
        {user.id !== ownerId && !userHasReviewCheck(reviews) && <button>Leave constructive criticism</button>}
      </section>

      <section>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>{review.author.userName}: {review.comment}</p>
            <p>{new Date(review.createdAt).toLocaleDateString()}</p>
            {review.author.id === user.id ? (
              <>
                <button onClick={() => console.log('edited')/*() => handleEdit(review.id)*/}>Edit</button>
                <button onClick={() => console.log('deleted')/*() => handleDelete(review.id)*/}>Delete</button>
              </>
            ) : null}
          </div>
        ))}
      </section>
    </div>
  );
}

export default ReviewRender;
