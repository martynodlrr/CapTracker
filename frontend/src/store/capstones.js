import normalizeData from './helperFunc.js';

// Action types
const SET_CAPSTONES = 'SET_CAPSTONES';
const SET_CAPSTONE = 'SET_CAPSTONE';
const CREATE_CAPSTONE = 'CREATE_CAPSTONE';
const UPDATE_CAPSTONE = 'UPDATE_CAPSTONE';

// Action creators
const setCapstones = (capstones) => ({
  type: SET_CAPSTONES,
  payload: capstones
});

const setCapstone = (capstone) => ({
  type: SET_CAPSTONE,
  payload: capstone
});

const createUserCapstone = (capstone) => ({
  type: CREATE_CAPSTONE,
  payload: capstone
});

const updateUserCapstone = (capstone) => ({
  type: UPDATE_CAPSTONE,
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

export const fetchUserCapstone = () => async (dispatch) => {
  const res = await fetch('/api/capstones/current');

  if (res.ok) {
    const data = await res.json();

    dispatch(updateUserCapstone({ ...data.capstone }));

    return data.capstone;
  }
  dispatch(updateUserCapstone({}));

  return false;
};

export const createCapstone = (capstone) => async (dispatch) => {
  const res = await fetch('/api/capstones/', {
    method: "POST",
		headers: {
      "Content-Type": "application/json",
		},
		body: JSON.stringify({
      title: capstone.title,
			url: capstone.url,
			cloned_from: capstone.clonedFrom,
			description: capstone.description,
		}),
	});

  if (res.ok) {
    const data = await res.json();
    const id = data.capstone.id;

    dispatch(createUserCapstone({ [id]: { ...data.capstone } }));

    return data.capstone;
  }

  return false
};

export const createCapstoneImage = (capstoneId, formData) => async (dispatch) => {
  const res = await fetch(`/api/capstones/${capstoneId}`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();

  return data;
};

export const updateCapstone = (capstone) => async (dispatch) => {
  const newCapstone = {
    description: capstone.description,
    title: capstone.title,
    url: capstone.url,
    cloned_from: capstone.clonedFrom,
  };

  const res = await fetch(`/api/capstones/${capstone.id}`, {
    method: "PUT",
		headers: {
      "Content-Type": "application/json",
		},
		body: JSON.stringify(newCapstone),
	});

  if (res.ok) {
    const data = await res.json();
    console.log(data)
    dispatch(updateUserCapstone( data.capstone ));

    return data.capstone;
  }

  return false;
};

export const updateCapstoneImage = (capstoneId, imageId, formData) => async (dispatch) => {
  const res = await fetch(`/api/capstones/${capstoneId}/images/${imageId}`, {
    method: 'PUT',
    body: formData,
  });

  return res
};

// Initial state
const initialState = {};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CAPSTONES:
      return {
        allCapstones: { ...action.payload },
        userCapstone: { ...state.userCapstone } || {},
      };

    case SET_CAPSTONE:
      return {
        ...state,
        allCapstones: { ...state.allCapstones, ...action.payload },
      };

    case CREATE_CAPSTONE:
      return {
        ...state,
        allCapstones: { ...state.allCapstones, [action.payload.id]: { ...action.payload } },
        userCapstone: { ...action.payload },
      };

    case UPDATE_CAPSTONE:
      return {
        ...state,
        userCapstone: { ...state.userCapstone, ...action.payload },
      };

    default:
      return state;
  }
}
