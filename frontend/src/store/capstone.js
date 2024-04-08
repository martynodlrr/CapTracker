// Action types
const SET_CAPSTONES = 'capstone/SET_CAPSTONES';
const SET_CAPSTONE = 'capstone/SET_CAPSTONE';
const CREATE_CAPSTONE = 'capstone/CREATE_CAPSTONE';
const UPDATE_CAPSTONE = 'capstone/UPDATE_CAPSTONE';
const DELETE_CAPSTONE = 'capstone/DELETE_CAPSTONE';

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

const deleteUserCapstone = (capstoneId) => ({
  type: DELETE_CAPSTONE,
  payload: capstoneId
});

// Thunk
export const fetchCapstones = (start) => async (dispatch) => {
  const res = await fetch(`/api/capstones?number=${start}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(setCapstones(data.capstones));

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

export const fetchUserCapstone = (userId) => async (dispatch) => {
  const res = await fetch(`/api/capstones/user/${userId}`);
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
      userId: capstone.userId
    }),
  });

  const data = await res.json();

  if (res.ok) {
    const id = data.capstone.id;
    dispatch(createUserCapstone({ [id]: { ...data.capstone } }));
    return data.capstone;
  }

  return data;
};

export const createCapstoneImage = (capstoneId, formData, userId) => async (dispatch) => {

  const res = await fetch(`/api/capstones/${capstoneId}/user/${userId}`, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();

  if (res.ok) {
    return data.capstoneImage;
  }

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
  const data = await res.json();

  if (res.ok) {
    dispatch(updateUserCapstone( data.capstone ));

    return data.capstone;
  }

  return data;
};

export const updateCapstoneImage = (capstoneId, imageId, formData) => async (dispatch) => {
  const res = await fetch(`/api/capstones/${capstoneId}/images/${imageId}`, {
    method: 'PUT',
    body: formData,
  });

  const data = await res.json();

  if (res.ok) {
    return data.capstoneImage;
  }

  return data;
};

export const deleteCapstone = (capstoneId) => async (dispatch) => {
  await fetch(`/api/capstones/${capstoneId}`, {
    method: 'DELETE',
  });
  dispatch(deleteUserCapstone(capstoneId));

  return
};

// Initial state
const initialState = {};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CAPSTONES:
      return {
        ...state,
        allCapstones: { ...state.allCapstones, ...action.payload },
        userCapstone: { ...state.userCapstone },
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
        allCapstones: {
          ...state.allCapstones,
          [action.payload.id]: {
            ...action.payload,
          },
        },
        userCapstone: { ...action.payload },
      };

      case DELETE_CAPSTONE:
        const updatedAllCapstones = { ...state.allCapstones };
        delete updatedAllCapstones[action.payload];

        return {
            ...state,
            allCapstones: updatedAllCapstones,
            userCapstone: {}
        };

    default:
      return state;
  }
}
