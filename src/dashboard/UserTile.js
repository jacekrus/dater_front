import React from 'react';
import './MainLayoutStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import Views from './Views';

const UserTile = ({ user, onUserDetailsClicked }) => {
    return (
        <NavLink to={Views.DASHBOARD.path + Views.USER_DETAILS.path + `/${user.id}`}>
            <div className="userTile" onClick={() => onUserDetailsClicked(user)}>
                <img src={user.photos[0]} className="userTilePhoto" />
                <div className="userTileDescription">{user.username}, {new Date().getFullYear() - user.dateOfBirth.substring(0, 4)}</div>
                <div className="userTileActionsContainer">
                    <FontAwesomeIcon icon={faEnvelope} className='userTileActionIcon' />
                </div>
            </div>
        </NavLink>
    );
}
export default UserTile;