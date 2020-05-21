import React, { Component } from 'react';
import './MainLayoutStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class MenuItem extends Component {

    render() {
        return (
            <div className={"menuItem" + (this.props.isActive ? " menuItemActive" : "" )} onClick={this.props.onClick}>
                <FontAwesomeIcon icon={this.props.icon} className="menuItemIcon" />
                <div className="menuItemDescription">{this.props.description}</div>
            </div>
        );
    }

}