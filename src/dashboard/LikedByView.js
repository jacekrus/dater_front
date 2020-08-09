import React, { Component } from 'react';
import './MainLayoutStyles.css';
import PaginatedTilesContainer from './PaginatedTilesContainer';
import axiosRequest from '../AxiosRequest';

export default class LikedByView extends Component {

    onAction = (evt, user) => {
        evt.preventDefault();
        axiosRequest.put("/users/like?id=" + user.id).catch( /* do nothing */);
    }

    render() {
        return (
            <PaginatedTilesContainer onMenuItemClicked={this.props.onMenuItemClicked} onUserDetailsClicked={this.props.onUserDetailsClicked} request={'likedby'} onAction={this.onAction}/>
        );
    }

}