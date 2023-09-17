import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import React, { useState } from "react";

import { useModal } from "../../context/Modal";
import { login } from "../../store/session";

import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    await dispatch(login('demo@aa.io', 'password'));
    history.push('/capstones');
    closeModal();
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div id='errors-display' className={!Object.values(errors).length ? 'hidden' : ''}>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className='Buttons'>Log In</button>
        <button onClick={signInDemo} className='Buttons' id='demo'>Demo Login</button>
      </form>
    </>
  );
}

export default LoginFormModal;
