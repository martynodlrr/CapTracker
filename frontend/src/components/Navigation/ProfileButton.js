import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

import './Navigation.css';

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const { logout, loginWithRedirect } = useAuth0();
  const closeMenu = () => setShowMenu(false);
  const history = useHistory();
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout({ logoutParams: { returnTo: window.location.origin } })

    closeMenu();
  };

  const handleProfileRedirect = () => {
    history.push(`/user`);
  };

  const handleCapstoneRedirect = () => {
    history.push(`/capstone/edit`);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <MenuRoundedIcon
        onClick={openMenu}
        id='menu-bars'
        variant="contained"
      />
      <div className={ulClassName} ref={ulRef}>
        {user?.id ? (
          <>
            <div className='image-container'>
              <img
                src={user.picture}
                alt="User's Profile"
                className='imgRender'
              />
            </div>
            <Button
              onClick={handleProfileRedirect}
              className='btn'
              variant="outlined"
            >Profile</Button>

            <Button
              onClick={handleCapstoneRedirect}
              className='btn'
              variant="outlined"
            >Capstone</Button>

            <Button
              onClick={handleLogout}
              className='btn'
              variant="contained"
            >Log Out</Button>
          </>
        ) : (
          <>
            <Button
              onClick={loginWithRedirect}
              variant="contained"
            >
              Log In
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
