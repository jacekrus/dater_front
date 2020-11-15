import React, { Component } from 'react';
import './MainLayoutStyles.css';
import Menu from './Menu';
import ViewContainer from './ViewContainer';
import Views from './Views';
import Stomp from 'stompjs';
import SockJS from "sockjs-client"

export default class MainLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeView: '',
            selectedUser: {},
            stomp: null,
            newMessage: null,
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
        var sock = new SockJS('http://localhost:8080/chat');
        let stomp = Stomp.over(sock);
        if (stomp) {
            this.setState({ stomp: stomp }, () => stomp.connect({}, this.onConnected))
        }
    }

    onConnected = () => {
        this.state.stomp.subscribe('/user/queue/messages', this.onMessageReceived)
    }

    onMessageReceived = (msg) => {
        let newMsg = JSON.parse(msg.body);
        this.setState({ newMessage: newMsg })
    }

    render() {
        return (
            <div className="mainLayout">
                <Menu activeView={this.state.activeView} onMenuItemClicked={this.onMenuItemClicked} onSelectedUserChanged={this.onSelectedUserChanged} />
                <ViewContainer selectedUser={this.state.selectedUser} onMenuItemClicked={this.onMenuItemClicked}
                    activeView={this.state.activeView} onSelectedUserChanged={this.onSelectedUserChanged} newMessage={this.state.newMessage} />
            </div>
        );
    }

}