import React, { Component } from 'react';
import './MainLayoutStyles.css';
import PaginatedTilesContainer from './PaginatedTilesContainer';
import Views from './Views';
import AppContext from '../AppContext';
import axiosRequest from '../AxiosRequest';

export default class DatesView extends Component {


    onAction = (evt, user) => {
        evt.preventDefault();
        evt.stopPropagation();
        let data = [{ id: user.id }, { id: this.context.state.user.id }]
        axiosRequest.post("/conversations?create=true", data)
            .then((resp) => {
                this.props.history.push(Views.DASHBOARD.path + Views.CHAT.path)
                this.props.onMenuItemClicked(Views.CHAT)
                this.props.onSendMessageClicked(resp.data.id);
            })
            .catch(() => {
                this.context.setError(true);
                this.context.setMessage("Error occured while opening conversation. Refresh the page and try again or contact site's administrator.")
            });

    }

    render() {
        return (
            <PaginatedTilesContainer onMenuItemClicked={this.props.onMenuItemClicked} onUserDetailsClicked={this.props.onUserDetailsClicked} request={'dates'} dates onAction={this.onAction} />
        );
    }

}
DatesView.contextType = AppContext;