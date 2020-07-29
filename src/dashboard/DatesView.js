import React, { Component } from 'react';
import './MainLayoutStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import PaginatedTilesContainer from './PaginatedTilesContainer';

export default class DatesView extends Component {

    render() {
        const actionsContainer =
            <div className="userTileActionsContainer">
                <FontAwesomeIcon icon={faEnvelope} className='userTileActionIcon' />
            </div>

        return (
            <PaginatedTilesContainer onUserDetailsClicked={this.props.onUserDetailsClicked} request={'favorites'} actionsContainer={actionsContainer} />
        );
    }

}