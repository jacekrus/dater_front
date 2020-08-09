import React from 'react';
import './MainLayoutStyles.css';
import { NavLink } from 'react-router-dom';
import Views from './Views';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const UserTile = ({ user, onUserDetailsClicked, onAction, dates, favorites }) => {
    return (
        <NavLink to={Views.DASHBOARD.path + Views.USER_DETAILS.path + `/${user.id}`}>
            <div className="userTile" onClick={() => onUserDetailsClicked(user)}>
                <img alt="img" src={user.photos[0]} className="userTilePhoto" />
                <div className="userTileDescription">{user.username}, {new Date().getFullYear() - user.dateOfBirth.substring(0, 4)}</div>
                {dates ? <div className="userTileActionsContainer">
                            <FontAwesomeIcon icon={faEnvelope} className='userTileActionIcon userTileEnvelopeActionIcon' onClick={(evt) => onAction(evt, user)}/>
                         </div>
                    : favorites ? <div className="userTileActionsContainer">
                                    <FontAwesomeIcon icon={faInfoCircle} className='userTileActionIcon userTileEnvelopeActionIcon' />
                                  </div>
                    : <div className="userTileActionsContainer">
                        <FontAwesomeIcon icon={faHeart} className='userTileActionIcon userTileHeartActionIcon' onClick={(evt) => onAction(evt, user)} />
                      </div>
                }
            </div>
        </NavLink>
    );
}
export default UserTile;