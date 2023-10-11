import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';

import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useModal } from "../../context/Modal";
import { logout } from "../../store/session";

import './Navigation.css';

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
  };

  const handleProfileRedirect = () => {
    history.push(`/users/${user.id}`);
  };

  const handleCapstoneRedirect = () => {
    history.push(`/capstone/edit`);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <MenuRoundedIcon onClick={openMenu} id='menu-bars' />
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className='image-container'>
              <img src={user.pfp} alt="User's Profile" />
            </div>
            {user.username}
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
                  <LoginFormModal />
                </ThemeProvider>}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              className='btn'
              modalComponent={
                <ThemeProvider theme={theme}>
                  <SignupFormModal />
                </ThemeProvider>
              }
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
