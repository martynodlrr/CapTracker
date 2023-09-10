import normalizeData from './helperFunc.js';

// Action types
const SET_CAPSTONES = 'SET_CAPSTONES';
const SET_CAPSTONE = 'SET_CAPSTONE';

// Action creators
const setCapstones = (capstones) => ({
  type: SET_CAPSTONES,
  payload: capstones
});

const setCapstone = (capstone) => ({
  type: SET_CAPSTONE,
  payload: capstone
});

// Thunk
export const fetchCapstones = (start) => async (dispatch) => {
  const res = await fetch(`/api/capstones?number=${start}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(setCapstones(normalizeData(data.capstones)));

    return data.capstones;
  }

  return false
};

export const fetchSingleCapstone = (capstoneId) => async (dispatch) => {
  const res = await fetch(`/api/capstones/${capstoneId}`);

  if (res.ok) {
    const data = await res.json();
    const id = data.capstone.id;

    dispatch(setCapstone({ [id]: { ...data.capstone } }));

    return data.capstone;
  }

  return false;
};

// Initial state
const initialState = {};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CAPSTONES:
      return { ...state, ...action.payload };

    case SET_CAPSTONE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
