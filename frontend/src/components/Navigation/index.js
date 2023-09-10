import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import imageSrc from '../../images/CapTrackerIcon.png';
import './Navigation.css';
function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul id='nav-container'>
			<li id='icon-container'>
				<img id='icon' src={imageSrc} />
				<p id='icon-label'>CapTracker</p>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
