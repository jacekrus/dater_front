import React, { Component } from 'react';
import './MainLayoutStyles.css';
import PaginatedTilesContainer from './PaginatedTilesContainer';
import axiosRequest from '../AxiosRequest';

export default class LikedByView extends Component {

    onAction = (evt, user) => {
        evt.preventDefault();
        axiosRequest.put("/users/like?id=" + user.id)
            .then(resp => {
                if(resp.status === 201) {
                    this.context.setMessage("You have a new Date! You can now send a message to " + user.username)
                }
            })
            .catch( /* do nothing */);
    }

    render() {
        return (
            <PaginatedTilesContainer onMenuItemClicked={this.props.onMenuItemClicked} onUserDetailsClicked={this.props.onUserDetailsClicked} request={'likedby'} onAction={this.onAction} />
        );
    }

}