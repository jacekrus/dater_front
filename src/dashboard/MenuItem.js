import React from 'react';
import './MainLayoutStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuItem = ({ icon, description, isActive, onClick, notifications }) => {
    return (
        <div className={"menuItem" + (isActive ? " menuItemActive" : "")} title={description} onClick={onClick}>
            <FontAwesomeIcon icon={icon} className="menuItemIcon" />
            <div className="menuItemDescription">{description}</div>
            {notifications && notifications > 0 ?
                <div className="menuNotification">
                    {notifications < 100 ? <div className="notificationText">{notifications}</div> :
                    <div className="notificationText notificationTextSmall">99+</div> }
                </div> : null}
        </div>
    );
}
export default MenuItem;
