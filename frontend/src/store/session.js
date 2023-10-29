// // constants
// const SET_USER = "session/SET_USER";
// const UPDATE_USER = "session/UPDATE_USER";
const REMOVE_USER = "session/REMOVE_USER";

// const setUser = (user) => ({
// 	type: SET_USER,
// 	payload: user,
// });

// const updateUser = (user) => ({
// 	type: UPDATE_USER,
// 	payload: user,
// });

const removeUser = () => ({
  type: REMOVE_USER,
});

const initialState = { user: null };

// export const authenticate = () => async (dispatch) => {
// 	const res = await fetch("/api/auth/", {
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});
// 	if (res.ok) {
// 		const data = await res.json();
// 		if (data.errors) {
// 			return;
// 		}

// 		dispatch(setUser(data));
// 	}
// };

// export const login = (email, password) => async (dispatch) => {
// 	const res = await fetch("/api/auth/login", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			email,
// 			password,
// 		}),
// 	});

// 	if (res.ok) {
// 		const data = await res.json();
// 		dispatch(setUser(data));
// 		return null;
// 	} else if (res.status < 500) {
// 		const data = await res.json();
// 		if (data.errors) {
// 			return data.errors;
// 		}
// 	} else {
// 		return ["An error occurred. Please try again."];
// 	}
// };

export const logout = () => async (dispatch) => {
  dispatch(removeUser());
};

// export const signUp = (user) => async (dispatch) => {
// 	const { nick_name, email, password, given_name, family_name } = user
// 	const res = await fetch("/api/auth/signup", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			nick_name,
// 			email,
// 			password,
// 			given_name: given_name,
// 			family_name: family_name
// 		}),
// 	});

// 	if (res.ok) {
// 		const data = await res.json();
// 		dispatch(setUser(data));
// 		return null;
// 	} else if (res.status < 500) {
// 		const data = await res.json();
// 		if (data.errors) {
// 			return data.errors;
// 		}
// 	} else {
// 		return ["An error occurred. Please try again."];
// 	}
// };

// export const update = (user) => async (dispatch) => {
// 	const formData = new FormData();

// 	if (user.given_name !== undefined && user.given_name !== null) formData.append('given_name', user.given_name);
// 	if (user.family_name !== undefined && user.family_name !== null) formData.append('family_name', user.family_name);
// 	if (user.nick_name !== undefined && user.nick_name !== null) formData.append('nick_name', user.nick_name);
// 	if (user.password !== undefined && user.password !== null) formData.append('password', user.password);
// 	if (user.linkedIn !== undefined && user.linkedIn !== null) formData.append('linkedin', user.linkedIn);
// 	if (user.github !== undefined && user.github !== null) formData.append('github', user.github);
// 	if (user.email !== undefined && user.email !== null) formData.append('email', user.email);

// 	// Only add the picture field if it's a File object (not a URL)
// 	if (user.picture && user.picture instanceof File) {
// 		formData.append('picture', user.picture);
// 	}

// 	const res = await fetch(`/api/auth/${user.userId}`, {
// 		method: "PUT",
// 		body: formData,
// 	});

// 	if (res.ok) {
// 		const data = await res.json();
// 		dispatch(updateUser(data));
// 		return null;
// 	} else if (res.status < 500) {
// 		const data = await res.json();
// 		if (data.errors) {
// 			return data.errors;
// 		}
// 	} else {
// 		return ["An error occurred. Please try again."];
// 	}
// };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // case SET_USER:
    // 	return { user: action.payload };

    // case UPDATE_USER:
    // 	return { ...action.payload };

    case REMOVE_USER:
      return { user: null };

    default:
      return state;
  }
}
