import React, { Component } from 'react';
import './MainLayoutStyles.css';
import Menu from './Menu';
import ViewContainer from './ViewContainer';
import Views from './Views';
import Stomp from 'stompjs';
import SockJS from "sockjs-client";
import AppContext from '../AppContext';

export default class MainLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeView: '',
            selectedUser: {},
            stomp: null,
            newMessage: null,
            newFavorite: null,
            newLikedBy: null,
            newDate: null,
        }
    }

    componentDidMount() {
        this.enableWebSockets();
    }

    onMenuItemClicked = (view) => {
        if (this.state.activeView !== view) {
            this.setState({ activeView: view });
        }
    }

    onSelectedUserChanged = (user) => {
        if (!this.selectedUser || this.selectedUser.id !== user.id) {
            this.setState({ selectedUser: user, activeView: Views.USER_DETAILS });
        }
    }

    enableWebSockets = () => {
        var sock = new SockJS('http://localhost:8080/datrSocket');
        let stomp = Stomp.over(sock);
        if (stomp) {
            this.setState({ stomp: stomp }, () => stomp.connect({}, this.onConnected))
        }
    }

    onConnected = () => {
        this.state.stomp.subscribe('/user/queue/notifications', this.onNotificationReceived)
    }

    onNotificationReceived = (notif) => {
        let notification = JSON.parse(notif.body);
        let type = notification.type;
        switch (type) {
            case 'MESSAGE':
                this.setState({ newMessage: notification.message }, () => setTimeout(() => this.setState({ newMessage: null }), 0))
                break;
            case 'FAVORITE':
                this.setState({ newFavorite: notification.favoriteUsername })
                break;
            case 'DATE':
                let dateId = this.context.state.user.username === notification.dateUsername ? notification.usernameOrEmail : notification.dateUsername;
                this.setState({ newDate: dateId })
                break;
            case 'LIKED':
                this.setState({ newLikedBy: notification.likedByUsername })
                break;
            default:
        }
    }

    render() {
        return (
            <div className="mainLayout">
                <Menu activeView={this.state.activeView} onMenuItemClicked={this.onMenuItemClicked}
                    onSelectedUserChanged={this.onSelectedUserChanged} newMessage={this.state.newMessage}
                    newDate={this.state.newDate} newFavorite={this.state.newFavorite} newLikedBy={this.state.newLikedBy} />
                <ViewContainer selectedUser={this.state.selectedUser} onMenuItemClicked={this.onMenuItemClicked}
                    activeView={this.state.activeView} onSelectedUserChanged={this.onSelectedUserChanged} newMessage={this.state.newMessage} />
            </div>
        );
    }

}
MainLayout.contextType = AppContext;