import { useHistory } from 'react-router-dom';
import React from 'react';

import imageSrc from '../../images/CapTrackerIcon.png';
import ProfileButton from './ProfileButton';

import './Navigation.css';

function Navigation({ user }) {
	const history = useHistory();

	const handleIconClick = () => {
		history.push('/capstones');
	};

	return (
		<ul id='nav-container'>
			<li id='icon-container' onClick={handleIconClick}>
				<img id='icon' src={imageSrc} alt='Page Icon' />
				<p id='icon-label'>CapTracker</p>
			</li>
				<li>
					<ProfileButton user={user} />
				</li>
		</ul>
	);
}

export default Navigation;
