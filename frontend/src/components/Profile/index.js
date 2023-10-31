// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import React, { useEffect, useState } from 'react';
// import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useAuth0 } from "@auth0/auth0-react";
// import Button from '@mui/material/Button';
// import ReactGA from 'react-ga';

import greetings from './greetings';

import './index.css';

function Profile() {
  const { user, isLoading } = useAuth0();

  const [previewSrc, setPreviewSrc] = useState(user.picture);
  const [given_name, setgiven_name] = useState(user.given_name);
  const [family_name, setfamily_name] = useState(user.family_name);
  const [nick_name, setnick_name] = useState(user.nick_name || user.nickname);
  const [linkedIn, setLinkedIn] = useState(user.linkedin || '');
  const [github, setGithub] = useState(user.github || '');
  // const [picture, setpicture] = useState(user.picture);
  // const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [greeting, setGreeting] = useState('');
  // const [password, setPassword] = useState('');

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);


  // useEffect(() => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   setDisabled(
  //     nick_name?.length < 4 ||
  //     nick_name?.length > 40 ||
  //     email.length > 75 ||
  //     !emailRegex.test(email) ||
  //     (password.length > 0 && password.length < 6)
  //   );
  // }, [given_name, family_name, nick_name, email, password]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   ReactGA.event({
  //     category: 'user',
  //     action: 'Updated profile'
  //   });

  //   const updatedUser = {
  //     given_name,
  //     family_name,
  //     nick_name,
  //     email,
  //     picture,
  //     linkedIn,
  //     github
  //   }

  //   if (password.length > 5) {
  //     updatedUser.password = password;
  //   } else {
  //     updatedUser.password = undefined;
  //   }

  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setpicture(file);
  //     const src = URL.createObjectURL(file);

  //     if (previewSrc) URL.revokeObjectURL(previewSrc);
  //     setPreviewSrc(src);
  //   } else {
  //     setPreviewSrc(user.picture);
  //   }
  // };

  if (isLoading) {
    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', background: 'rgb(247, 247, 239)', display: 'block', shapeRendering: 'auto' }} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <path fill="none" stroke="#0a0a0a" strokeWidth="7" strokeDasharray="233.4959246826172 23.093003540039064" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeLinecap="round" style={{ transform: 'scale(1)', transformOrigin: '50px 50px' }}>
            <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1.8518518518518516s" keyTimes="0;1" values="0;256.58892822265625"></animate>
          </path>
        </svg>
      </div>
    );
  }

  return (
    <div id='profile-group'>
      <h1
        className='heading'
        style={{ marginBottom: '50px' }}
      >{greeting}</h1>
      {/* <form onSubmit={handleSubmit} encType="multipart/form-data" id='profile-form'> */}
      <div
        id='profile-form'
        style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        paddingBottom: '50px'}}
      >
        <div className='file-input-container'>
          <span className="picture-render">
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
                alt={`${given_name} ${family_name} Profile Preview`}
                className='imgRender'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </span>

          {/* <input
            accept="image/*"
            id="picture-input"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            />
            <label htmlFor="picture-input">
            <IconButton
            color="secondary"
            aria-label="upload picture"
            component="span"
            >
            <PhotoCamera />
            </IconButton>
          </label> */}
        </div>

        <div className="form-field">
          <TextField
            variant="filled"
            id="first-name"
            label="First Name"
            type="text"
            disabled={true}
            // onChange={(e) => setgiven_name(e.target.value)}
            value={given_name}
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
            disabled={true}
            // onChange={(e) => setfamily_name(e.target.value)}
            value={family_name}
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
            // onChange={(e) => setEmail(e.target.value)}
            disabled={true}
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
            id="nick_name"
            label="User Name"
            type="text"
            required
            disabled={true}
            // onChange={(e) => setnick_name(e.target.value)}
            value={nick_name}
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

        {/* <div className="form-field">
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
        </div> */}

        {(linkedIn || github) && <h3
          className='heading'
          style={{
            margin: '0px'
          }}
        >Socials</h3>}

        {github && <div className="form-field">
          <TextField
            variant="filled"
            id="github"
            label="GitHub"
            type="url"
            // onChange={(e) => setGithub(e.target.value)}
            value={github}
            disabled={true}
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
        </div>}

        {linkedIn && <div className="form-field">
          <TextField
            variant="filled"
            id="linkedIn"
            label="LinkedIn"
            type="text"
            // onChange={(e) => setLinkedIn(e.target.value)}
            value={linkedIn}
            disabled={true}
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
        </div>}

        {/* <Button
          type="submit"
          className="btn"
          disabled={disabled}
          variant='contained'
        >Update Profile</Button> */}
      </div>
      {/* </form> */}
    </div>
  );
}

export default Profile;
