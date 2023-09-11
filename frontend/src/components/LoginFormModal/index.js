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
      setErrors(data);
    } else {
      history.push('/capstones');
      closeModal()
    }
  };

  const signInDemo = async () => {
    await dispatch(login('demo@aa.io', 'password'));
    history.push('/capstones');
    closeModal();
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <button onClick={() => signInDemo()}>Demo Login</button>
    </>
  );
}

export default LoginFormModal;
