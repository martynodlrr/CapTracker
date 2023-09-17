import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";

import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useModal } from "../../context/Modal";
import { logout } from "../../store/session";

import './Navigation.css';

function ProfileButton({ user }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
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
      <button onClick={openMenu} id='menuBars'>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li><img src={user.pfp} alt="User's Profile" id="pfp" /></li>
            <li>{user.username}</li>
            <li><button onClick={handleProfileRedirect} className='Buttons'>Profile</button></li>
            <li><button onClick={handleCapstoneRedirect} className='Buttons'>Capstone</button></li>
            <nav>
              <button onClick={handleLogout}>Log Out</button>
            </nav>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
