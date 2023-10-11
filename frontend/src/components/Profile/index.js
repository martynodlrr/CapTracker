import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReactGA from 'react-ga';

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

    ReactGA.event({
      category: 'User',
      action: 'Updated profile'
    });

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

    if (password.length > 5) {
      updatedUser.password = password;
    } else {
      updatedUser.password = undefined;
    }

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
    <div id='profile-group'>
      <h1
        className='heading'
        style={{marginBottom: '50px'}}
      >{greeting}</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" id='profile-form'>
        <div className='file-input-container'>
          <span className="pfp-render">
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={previewSrc}
                alt={`${firstName} ${lastName} Profile Preview`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </span>

          <input
            accept="image/*"
            id="pfp-input"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <label htmlFor="pfp-input">
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </div>

          <div className="form-field">
            <TextField
              variant="filled"
              id="first-name"
              label="First Name"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'white',
                  color: 'black',
                },
                '& .MuiFilledInput-input': {
                  color: 'black',
                },
                '& .MuiInputLabel-filled': {
                  color: 'black',
                }
              }}
            />
          </div>

          <div className="form-field">
            <TextField
              variant="filled"
              id="last-name"
              label="Last Name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'white',
                  color: 'black',
                },
                '& .MuiFilledInput-input': {
                  color: 'black',
                },
                '& .MuiInputLabel-filled': {
                  color: 'black',
                }
              }}
            />
          </div>

          <div className="form-field">
            <TextField
              variant="filled"
              id="email"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'white',
                  color: 'black',
                },
                '& .MuiFilledInput-input': {
                  color: 'black',
                },
                '& .MuiInputLabel-filled': {
                  color: 'black',
                }
              }}
            />
          </div>

          <div className="form-field">
            <TextField
              variant="filled"
              id="username"
              label="Username"
            type="text"
            required
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'white',
                  color: 'black',
                },
                '& .MuiFilledInput-input': {
                  color: 'black',
                },
                '& .MuiInputLabel-filled': {
                  color: 'black',
                }
              }}
            />
          </div>

          <div className="form-field">
            <TextField
              variant="filled"
              id="password"
              label="Update Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'white',
                  color: 'black',
                },
                '& .MuiFilledInput-input': {
                  color: 'black',
                },
                '& .MuiInputLabel-filled': {
                  color: 'black',
                }
              }}
            />
          </div>

        <h3
          className='heading'
          style={{
            margin: '0px'
          }}
        >Socials</h3>

          <div className="form-field">
            <TextField
              variant="filled"
              id="github"
              label="GitHub"
              type="url"
              onChange={(e) => setGithub(e.target.value)}
              value={github}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'white',
                  color: 'black',
                },
                '& .MuiFilledInput-input': {
                  color: 'black',
                },
                '& .MuiInputLabel-filled': {
                  color: 'black',
                }
              }}
            />
          </div>

          <div className="form-field">
            <TextField
              variant="filled"
              id="linkedIn"
              label="LinkedIn"
              type="text"
              onChange={(e) => setLinkedIn(e.target.value)}
              value={linkedIn}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'white',
                  color: 'black',
                },
                '& .MuiFilledInput-input': {
                  color: 'black',
                },
                '& .MuiInputLabel-filled': {
                  color: 'black',
                }
              }}
            />
          </div>

        <Button
          type="submit"
          className="btn"
          disabled={disabled}
          variant='contained'
        >Update Profile</Button>
      </form>
    </div>
  );
}

export default Profile;
