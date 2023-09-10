import normalizeData from './helperFunc.js';

// Action types
const SET_CAPSTONES = 'SET_CAPSTONES';

// Action creators
const setCapstones = (capstones) => ({
  type: SET_CAPSTONES,
  payload: capstones
});

// Thunk
export const fetchCapstones = (start) => async (dispatch) => {
  const res = await fetch(`/api/capstones?number=${start}`);
  const data = await res.json();

  if (res.ok) {
    dispatch(setCapstones(normalizeData(data.capstones)));
  }
  
  return data.capstones;
};

// Initial state
const initialState = {};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CAPSTONES:
      return { ...state, capstones: { ...state.capstones, ...action.payload } };
    default:
      return state;
  }
}
