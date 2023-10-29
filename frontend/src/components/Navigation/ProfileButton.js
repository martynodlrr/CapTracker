import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';

import OpenModalButton from "../OpenModalButton";
// import SignupFormModal from "../SignupFormModal";
// import LoginFormModal from "../LoginFormModal";
// import { useModal } from "../../context/Modal";
// import { logout } from "../../store/session";

import './Navigation.css';

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);
  const dispatch = useDispatch();
  const { logout } = useAuth0();
  const history = useHistory();
  const theme = useTheme();
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    user.id ? dispatch(logout()) : logout({ logoutParams: { returnTo: window.location.origin } })

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
      <MenuRoundedIcon onClick={openMenu} id='menu-bars' />
      <div className={ulClassName} ref={ulRef}>
        {user?.id ? (
          <>
            <div className='image-container'>
              <img src={user.picture} alt="User's Profile" />
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
              variant="contained"
            >Log Out</Button>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={
                <ThemeProvider theme={theme}>
                  {/* <LoginFormModal /> */}
                </ThemeProvider>}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
