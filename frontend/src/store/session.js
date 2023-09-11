// constants
const SET_USER = "session/SET_USER";
const UPDATE_USER = "session/UPDATE_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const updateUser = (user) => ({
	type: UPDATE_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const update = (user) => async (dispatch) => {
	const formData = new FormData();

	formData.append('firstName', user.firstName);
	formData.append('lastName', user.lastName);
	formData.append('userName', user.userName);
	formData.append('password', user.password);
	formData.append('email', user.email);

	// Only add the pfp field if it's a File object (not a URL)
	if (user.pfp && user.pfp instanceof File) {
		formData.append('pfp', user.pfp);
	}

	const response = await fetch(`/api/auth/${user.userId}`, {
		method: "PUT",
		body: formData,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(updateUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };

		case UPDATE_USER:
			return { ...action.payload };

		case REMOVE_USER:
			return { user: null };

		default:
			return state;
	}
}
