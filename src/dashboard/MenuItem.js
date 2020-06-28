import React from 'react';
import './MainLayoutStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuItem = ({icon, description, isActive, onClick}) => {
    return (
        <div className={"menuItem" + (isActive ? " menuItemActive" : "" )} title={description} onClick={onClick}>
            <FontAwesomeIcon icon={icon} className="menuItemIcon" />
            <div className="menuItemDescription">{description}</div>
        </div>
    );
}
export default MenuItem;
