import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import React, { useState } from "react";
import ReactGa from 'react-ga';

import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";

import "./SignupForm.css";

function SignupFormModal({ theme }) {
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

		ReactGa.event({
			category: 'User',
			action: 'Signed up',
		});


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
			setConfirmPasswordError("Passwords must be the same");
		}
	};

	return (
		<div className='auth-form'>
			<h1 className='auth-heading'>Sign Up</h1>
			<form onSubmit={handleSubmit}>

				<div className='name-inputs'>
					<div className='input-container'>
						<div className={firstNameError ? 'error-display' : 'error-display-hidden'}>{firstNameError}</div>
						<TextField
							type="text"
							label="First Name"
							value={firstName}
							onChange={(e) => { setFirstName(e.target.value); setFirstNameError(''); }}
							required
							variant="standard"
						/>
					</div>

					<div className='input-container'>
						<div className={lastNameError ? 'error-display' : 'error-display-hidden'}>{lastNameError}</div>
						<TextField
							type="text"
							label="Last Name"
							value={lastName}
							onChange={(e) => { setLastName(e.target.value); setLastNameError(''); }}
							required
							variant="standard"
						/>
					</div>
				</div>

				<div className='email-username-inputs'>
					<div className='input-container'>
						<div className={emailError ? 'error-display' : 'error-display-hidden'}>{emailError}</div>
						<TextField
							type="text"
							label="Email"
							value={email}
							onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
							required
							variant="standard"
						/>
					</div>

					<div className='input-container'>
						<div className={usernameError ? 'error-display' : 'error-display-hidden'}>{usernameError}</div>
						<TextField
							type="text"
							label="Username"
							value={username}
							onChange={(e) => { setUsername(e.target.value); setUsernameError(''); }}
							required
							variant='standard'
						/>
					</div>
				</div>

				<div className='password-inputs'>
					<div className='input-container'>
						<div className={passwordError ? 'error-display' : 'error-display-hidden'}>{passwordError}</div>
						<TextField
							type="password"
							label="Password"
							value={password}
							onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
							required
							variant='standard'
						/>
					</div>

					<div className='input-container'>
						<div className={confirmPasswordError ? 'error-display' : 'error-display-hidden'}>{confirmPasswordError}</div>
						<TextField
							type="password"
							label="Confirm Password"
							value={confirmPassword}
							onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(''); }}
							required
							variant='standard'
						/>
					</div>
				</div>

				<Button
					type="submit"
					variant="contained"
					size='large'
				>Sign Up</Button>
			</form>
		</div>
	);
}

export default SignupFormModal;
