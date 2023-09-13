import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

import * as sessionActions from '../../store/session'
import greetings from './greetings';

import './index.css';

function Profile() {
  const user = useSelector(state => state.session.user);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [previewSrc, setPreviewSrc] = useState(user?.pfp || null);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [userName, setUserName] = useState(user.userName);
  const [linkedIn, setLinkedIn] = useState(user.LinkedIn || '');
  const [github, setGithub] = useState(user.GitHub || '');
  const [pfp, setPfp] = useState(user?.pfp || null);
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [greeting, setGreeting] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  useEffect(() => {
    if (userId !== user.id) {
      history.push(`/users/${user.id}`);
    }
  }, [userId, user.id, history]);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setDisabled(
      firstName.length < 2 ||
      firstName.length > 25 ||
      lastName.length < 2 ||
      lastName.length > 50 ||
      userName.length < 4 ||
      userName.length > 40 ||
      email.length > 75 ||
      !emailRegex.test(email) ||
      (password.length > 0 && password.length < 6)
    );
  }, [firstName, lastName, userName, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      firstName,
      lastName,
      userName: user.userName === userName ? '' : userName,
      email: user.email === email ? '' : email,
      pfp: pfp === "https://i.pinimg.com/originals/09/f0/84/09f084cd8a8093ea5738a3ab75c210df.png" ? false : pfp,
      userId: user.id,
      linkedIn,
      github
    }

    if (password.length >= 6)
      updatedUser.password = password;

    dispatch(sessionActions.update(updatedUser, user.id))
      .catch((e) => {
        console.error("Error updating user: ", e);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPfp(file);
      const src = URL.createObjectURL(file);

      if (previewSrc) URL.revokeObjectURL(previewSrc);
      setPreviewSrc(src);
    } else {
      setPreviewSrc(user?.pfp || null);
    }
  };

  return (
    <>
      <h1>{greeting}</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" id='profile-form'>
        <div className='file-input-container'>
          <span className="pfp-render">
            <img src={previewSrc} alt={`${firstName} ${lastName} Profile Preview`} id='profile-picture' />
          </span>

          <button type="button" className="file-select-button" onClick={() => document.getElementById('pfp-input').click()}>Select File</button>
          <input
            id="pfp-input"
            className='profile-input-hidden'
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="firstName" className='profile-label'>First Name</label>
          <input
            id="firstName"
            className='profile-input'
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="First Name"
            required={true}
          />
        </div>

        <div className="form-field">
          <label htmlFor="lastName" className='profile-label'>Last Name</label>
          <input
            id="lastName"
            className='profile-input'
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Last Name"
            required={true}
          />
        </div>

        <div className="form-field">
          <label htmlFor="email" className='profile-label'>Email</label>
          <input
            id="email"
            className='profile-input'
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            required={true}
          />
        </div>

        <div className="form-field">
          <label htmlFor="userName" className='profile-label'>Username</label>
          <input
            id="userName"
            className='profile-input'
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            placeholder="Username"
            required={true}
          />
        </div>

        <div className="form-field">
          <label htmlFor="password" className='profile-label'>Password</label>
          <input
            id="password"
            className='profile-input'
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>

        <h3 id='socials-title'>Socials</h3>

        <div className="form-field">
          <label htmlFor="github" className='profile-label'>GitHub</label>
          <input
            id="github"
            className='profile-input'
            type="text"
            onChange={(e) => setGithub(e.target.value)}
            value={github}
            placeholder="GitHub"
          />
        </div>

        <div className="form-field">
          <label htmlFor="linkedIn" className='profile-label'>LinkedIn</label>
          <input
            id="linkedIn"
            className='profile-input'
            type="text"
            onChange={(e) => setLinkedIn(e.target.value)}
            value={linkedIn}
            placeholder="LinkedIn"
          />
        </div>

        <button type="submit" className="form-submit" disabled={disabled}>Update Profile</button>
      </form>
    </>
  );
}

export default Profile;
