import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import React, { useState } from "react";
import ReactGa from 'react-ga';

import { useModal } from "../../context/Modal";
import { login } from "../../store/session";

import "./LoginForm.css";

function LoginFormModal({ theme }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    ReactGa.event({
      category: 'User',
      action: 'Logged in',
    });

    const data = await dispatch(login(email, password));
    if (data) {
      for (const error of data) {
        if (error.includes('Invalid')) {
          setErrors(['Invalid Credentials']);
          break;
        }
      }
    } else {
      history.push('/capstones');
      closeModal()
    }
  };

  const signInDemo = async (e) => {
    e.preventDefault();

    ReactGa.event({
      category: 'User',
      action: 'Logged in as demo user',
    });

    await dispatch(login('demo@aa.io', 'password'));
    history.push('/capstones');
    closeModal();
  };

  return (
    <div className='auth-form'>
      <h1 className='auth-heading'>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className={errors.length ? 'error-display' : 'error-display-hidden'}>
          {errors[0]}
        </div>
        <TextField
          type="text"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="standard"
        />

        <TextField
          type="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="standard"
        />

        <div className='btn-container'>
            <Button
            type="submit"
            className='btn'
              disabled={email.length < 4 || password.length < 6}
              variant="outlined"
            >
              Log In
            </Button>

            <Button
              onClick={signInDemo}
              variant="contained"
            >
              Demo Login
            </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
