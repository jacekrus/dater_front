import React, { Component } from 'react';
import './MainLayoutStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import PaginatedTilesContainer from './PaginatedTilesContainer';

export default class LikedByView extends Component {

    render() {
        const actionsContainer =
            <div className="userTileActionsContainer">
                <FontAwesomeIcon icon={faHeart} className='userTileActionIcon userTileHeartActionIcon' />
            </div>

        return (
            <PaginatedTilesContainer onUserDetailsClicked={this.props.onUserDetailsClicked} request={'likedby'} actionsContainer={actionsContainer} />
        );
    }

}