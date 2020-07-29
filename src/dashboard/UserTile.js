import React from 'react';
import './MainLayoutStyles.css';
import { NavLink } from 'react-router-dom';
import Views from './Views';

const UserTile = ({ user, onUserDetailsClicked, menu }) => {
    return (
        <NavLink to={Views.DASHBOARD.path + Views.USER_DETAILS.path + `/${user.id}`}>
            <div className="userTile" onClick={() => onUserDetailsClicked(user)}>
                <img src={user.photos[0]} className="userTilePhoto" />
                <div className="userTileDescription">{user.username}, {new Date().getFullYear() - user.dateOfBirth.substring(0, 4)}</div>
                {menu}
            </div>
        </NavLink>
    );
}
export default UserTile;