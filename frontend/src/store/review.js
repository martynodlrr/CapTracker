import normalizeData from './helperFunc.js';

// Action types
const SET_REVIEWS = "review/SET_REVIEWS";
const CREATE_REVIEW = "review/CREATE_REVIEW";
const UPDATE_REVIEW = "review/UPDATE_REVIEW";
const REMOVE_REVIEW = "review/REMOVE_REVIEW";

// Action creators
const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  payload: reviews,
});

const addReview = (review) => ({
  type: CREATE_REVIEW,
  payload: review,
});

const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  payload: review,
});

const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  payload: reviewId,
});

// Thunk
export const getReviews = (capstoneId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/capstones/${capstoneId}`);

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return;
    }

    dispatch(setReviews(normalizeData(data.reviews)));
  }

  return false;
};

export const createReview = (comment, capstoneId, nick_name) => async (dispatch) => {
  const res = await fetch(`/api/reviews/capstones/${capstoneId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment: comment.review,
      author: nick_name
    }),
  });

  if (res.ok) {
    const data = await res.json();

    dispatch(addReview(data.review));

    return data.review;

  }
};

export const postUpdateReview = (comment) => async (dispatch) => {

  const res = await fetch(`/api/reviews/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment: comment.review
    }),
  });
  const data = await res.json();

  if (res.ok) {
    dispatch(updateReview(data.review));

    return data.review;
  }

  if (data.errors) {
    return data.errors;
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  });

  if (res.ok) {
    dispatch(removeReview(reviewId));

    return null;
  }
};

// Initial state
const initialState = {};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return {
        ...action.payload,
      };

    case CREATE_REVIEW:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };

    case UPDATE_REVIEW:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };

    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;

    default:
      return state;
  }
}
