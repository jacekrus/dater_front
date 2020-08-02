import React, { Component } from 'react';
import './MainLayoutStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import PaginatedTilesContainer from './PaginatedTilesContainer';

export default class FavoritesView extends Component {

    render() {
        const actionsContainer =
            <div className="userTileActionsContainer">
                <FontAwesomeIcon icon={faHeart} className='userTileActionIcon' />
            </div>

        return (
            <PaginatedTilesContainer onMenuItemClicked={this.props.onMenuItemClicked} onUserDetailsClicked={this.props.onUserDetailsClicked} request={'favorites'} actionsContainer={actionsContainer} />
        );
    }

}