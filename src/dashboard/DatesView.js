import React, { Component } from 'react';
import './MainLayoutStyles.css';
import PaginatedTilesContainer from './PaginatedTilesContainer';
import Views from './Views';

export default class DatesView extends Component {


    onAction = (evt) => {
        evt.preventDefault();
        this.props.history.push(Views.DASHBOARD.path + Views.CHAT.path)
        this.props.onMenuItemClicked(Views.CHAT)
    }

    render() {
        return (
            <PaginatedTilesContainer onMenuItemClicked={this.props.onMenuItemClicked} onUserDetailsClicked={this.props.onUserDetailsClicked} request={'dates'} dates onAction={this.onAction} />
        );
    }

}