import React, { Component } from 'react';
import './MainLayoutStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuItem = (props) => {
    return (
        <div className={"menuItem" + (props.isActive ? " menuItemActive" : "" )} onClick={props.onClick}>
            <FontAwesomeIcon icon={props.icon} className="menuItemIcon" />
            <div className="menuItemDescription">{props.description}</div>
        </div>
    );
}
export default MenuItem;
