import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import React, { useState } from "react";

import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";

import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const user = {
				username,
				email,
				password,
				firstName,
				lastName
			}
			const data = await dispatch(signUp(user));

			if (data) {
				setErrors(data);
				data.forEach(error => {
					if (error.includes("first_name")) setFirstNameError(error.split('Field ')[1]);
					if (error.includes("last_name")) setLastNameError(error.split('Field ')[1]);
					if (error.includes("username")) setUsernameError(error.split('Field ')[1]);
					if (error.includes("email")) setEmailError(error.split(' : ')[1]);
					if (error.includes("password")) setPasswordError(error.split('Field ')[1]);
				});
			} else {
				history.push('/capstones');
				closeModal();
			}
		} else {
			setConfirmPasswordError("Confirm Password field must be the same as the Password field");
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div className="error-display">{firstNameError}</div>
				<label>
					First Name:
					<input
						type="text"
						value={firstName}
						onChange={(e) => { setFirstName(e.target.value); setFirstNameError(''); }}
						required
					/>
				</label>

				<div className="error-display">{lastNameError}</div>
				<label>
					Last Name:
					<input
						type="text"
						value={lastName}
						onChange={(e) => { setLastName(e.target.value); setLastNameError(''); }}
						required
					/>
				</label>

				<div className="error-display">{emailError}</div>
				<label>
					Email:
					<input
						type="text"
						value={email}
						onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
						required
					/>
				</label>

				<div className="error-display">{usernameError}</div>
				<label>
					Username:
					<input
						type="text"
						value={username}
						onChange={(e) => { setUsername(e.target.value); setUsernameError(''); }}
						required
					/>
				</label>

				<div className="error-display">{passwordError}</div>
				<label>
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
						required
					/>
				</label>

				<div className="error-display">{confirmPasswordError}</div>
				<label>
					Confirm Password:
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(''); }}
						required
					/>
				</label>

				<button type="submit" id='submit-button'>Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
