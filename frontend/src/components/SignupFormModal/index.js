// import TextField from '@mui/material/TextField';
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import Button from '@mui/material/Button';
// import React, { useState } from "react";
// import ReactGa from 'react-ga';

// import { useModal } from "../../context/Modal";
// import { signUp } from "../../store/session";

// import "./SignupForm.css";

// function SignupFormModal({ theme }) {
// 	const dispatch = useDispatch();
// 	const history = useHistory();
// 	const [email, setEmail] = useState("");
// 	const [nick_name, setnick_name] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [given_name, setgiven_name] = useState("");
// 	const [family_name, setfamily_name] = useState("");
// 	const [confirmPassword, setConfirmPassword] = useState("");
// 	const [errors, setErrors] = useState([]);
// 	const [given_nameError, setgiven_nameError] = useState("");
// 	const [family_nameError, setfamily_nameError] = useState("");
// 	const [nick_nameError, setnick_nameError] = useState("");
// 	const [emailError, setEmailError] = useState("");
// 	const [passwordError, setPasswordError] = useState("");
// 	const [confirmPasswordError, setConfirmPasswordError] = useState("");
// 	const { closeModal } = useModal();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();

// 		ReactGa.event({
// 			category: 'User',
// 			action: 'Signed up',
// 		});


// 		if (password === confirmPassword) {
// 			const user = {
// 				nick_name,
// 				email,
// 				password,
// 				given_name,
// 				family_name
// 			}
// 			const data = await dispatch(signUp(user));

// 			if (data) {
// 				setErrors(data);
// 				data.forEach(error => {
// 					if (error.includes("given_name")) setgiven_nameError(error.split('Field ')[1]);
// 					if (error.includes("family_name")) setfamily_nameError(error.split('Field ')[1]);
// 					if (error.includes("nick_name")) setnick_nameError(error.split('Field ')[1]);
// 					if (error.includes("email")) setEmailError(error.split(' : ')[1]);
// 					if (error.includes("password")) setPasswordError(error.split('Field ')[1]);
// 				});
// 			} else {
// 				history.push('/capstones');
// 				closeModal();
// 			}
// 		} else {
// 			setConfirmPasswordError("Passwords must be the same");
// 		}
// 	};

// 	return (
// 		<div className='auth-form'>
// 			<h1 className='auth-heading'>Sign Up</h1>
// 			<form onSubmit={handleSubmit}>

// 				<div className='name-inputs'>
// 					<div className='input-container'>
// 						<div className={given_nameError ? 'error-display' : 'error-display-hidden'}>{given_nameError}</div>
// 						<TextField
// 							type="text"
// 							label="First Name"
// 							value={given_name}
// 							onChange={(e) => { setgiven_name(e.target.value); setgiven_nameError(''); }}
// 							required
// 							variant="standard"
// 						/>
// 					</div>

// 					<div className='input-container'>
// 						<div className={family_nameError ? 'error-display' : 'error-display-hidden'}>{family_nameError}</div>
// 						<TextField
// 							type="text"
// 							label="Last Name"
// 							value={family_name}
// 							onChange={(e) => { setfamily_name(e.target.value); setfamily_nameError(''); }}
// 							required
// 							variant="standard"
// 						/>
// 					</div>
// 				</div>

// 				<div className='email-nick_name-inputs'>
// 					<div className='input-container'>
// 						<div className={emailError ? 'error-display' : 'error-display-hidden'}>{emailError}</div>
// 						<TextField
// 							type="text"
// 							label="Email"
// 							value={email}
// 							onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
// 							required
// 							variant="standard"
// 						/>
// 					</div>

// 					<div className='input-container'>
// 						<div className={nick_nameError ? 'error-display' : 'error-display-hidden'}>{nick_nameError}</div>
// 						<TextField
// 							type="text"
// 							label="nick_name"
// 							value={nick_name}
// 							onChange={(e) => { setnick_name(e.target.value); setnick_nameError(''); }}
// 							required
// 							variant='standard'
// 						/>
// 					</div>
// 				</div>

// 				<div className='password-inputs'>
// 					<div className='input-container'>
// 						<div className={passwordError ? 'error-display' : 'error-display-hidden'}>{passwordError}</div>
// 						<TextField
// 							type="password"
// 							label="Password"
// 							value={password}
// 							onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
// 							required
// 							variant='standard'
// 						/>
// 					</div>

// 					<div className='input-container'>
// 						<div className={confirmPasswordError ? 'error-display' : 'error-display-hidden'}>{confirmPasswordError}</div>
// 						<TextField
// 							type="password"
// 							label="Confirm Password"
// 							value={confirmPassword}
// 							onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(''); }}
// 							required
// 							variant='standard'
// 						/>
// 					</div>
// 				</div>

// 				<Button
// 					type="submit"
// 					variant="contained"
// 					size='large'
// 				>Sign Up</Button>
// 			</form>
// 		</div>
// 	);
// }

// export default SignupFormModal;
