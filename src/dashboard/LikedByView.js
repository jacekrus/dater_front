import React, { Component } from 'react';
import './MainLayoutStyles.css';
import PaginatedTilesContainer from './PaginatedTilesContainer';
import axiosRequest from '../AxiosRequest';
import AppContext from '../AppContext';

export default class LikedByView extends Component {

    onAction = (evt, user) => {
        evt.preventDefault();
        axiosRequest.put("/users/like?id=" + user.id)
            .then(resp => {
                if(resp.status === 201) {
                    this.context.setMessage("You have a new Date! You can now send a message to " + user.username)
                }
                else if(resp.data === "") {
                    this.context.setMessage("You already have this user on your favorites list.")
                }
            })
            .catch(() => this.context.setMessage("Something went wrong. Try refreshing the page or contact site's administrator."));
    }

    render() {
        return (
            <PaginatedTilesContainer onMenuItemClicked={this.props.onMenuItemClicked} onUserDetailsClicked={this.props.onUserDetailsClicked} request={'likedby'} onAction={this.onAction} />
        );
    }

}
LikedByView.contextType = AppContext;