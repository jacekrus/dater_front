import React, { Component } from 'react';
import './MainLayoutStyles.css';
import UserPanel from './UserPanel';
import MenuItem from './MenuItem';
import { faBinoculars } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faKissWinkHeart } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faGrinHearts } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Views from './Views';
import { NavLink } from 'react-router-dom';
import AppContext from '../AppContext';
import axiosRequest from '../AxiosRequest';
import Recommended from './Recommended';

export default class Menu extends Component {

    state = {
        chatNotifications: 0,
        newMessage: null,
    }

    componentDidMount() {
        let notifications = localStorage.getItem('chatNotifications-' + this.context.state.user.id);
        if (notifications) {
            this.setState({ chatNotifications: parseInt(notifications) })
        }
    }

    componentDidUpdate() {
        if (this.props.newMessage !== null && (this.state.newMessage === null || this.props.newMessage.id !== this.state.newMessage.id)) {
            if (this.props.activeView !== Views.CHAT) {
                this.setState((prevState) =>
                    ({ newMessage: this.props.newMessage, chatNotifications: prevState.chatNotifications + 1 }),
                    () => localStorage.setItem('chatNotifications-'  + this.context.state.user.id, parseInt(this.state.chatNotifications)))
            }
        }
    }

    onLogout = (context) => {
        axiosRequest.post('/datrLogout')
            .then(() => {
                context.setLoggedIn(false);
                context.setUser({});
            })
            .catch(() => {
                //do nothing
            });
    }

    onRecommendedUserClicked = (user) => {
        this.props.onSelectedUserChanged(user);
        this.props.onMenuItemClicked(Views.USER_DETAILS);
    }

    onChatItemClicked = () => {
        this.props.onMenuItemClicked(Views.CHAT)
        localStorage.removeItem('chatNotifications-' + this.context.state.user.id)
        this.setState({ chatNotifications: 0 })
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="menu">
                        <div className="menuTitle">Dater</div>
                        <div className="splitterHorizontal" />
                        <NavLink to={Views.DASHBOARD.path + Views.EDIT_PROFILE.path} style={{ textDecoration: 'none' }}>
                            <UserPanel onClick={() => this.props.onMenuItemClicked(Views.EDIT_PROFILE)} />
                        </NavLink>
                        <NavLink to={Views.DASHBOARD.path + Views.FIND_A_DATE.path} style={{ textDecoration: 'none' }}>
                            <MenuItem icon={faBinoculars} description="Find a date" isActive={this.props.activeView === Views.FIND_A_DATE} onClick={() => this.props.onMenuItemClicked(Views.FIND_A_DATE)} />
                        </NavLink>
                        <NavLink to={Views.DASHBOARD.path + Views.DATES.path} style={{ textDecoration: 'none' }}>
                            <MenuItem icon={faHeart} description="Dates" isActive={this.props.activeView === Views.DATES} onClick={() => this.props.onMenuItemClicked(Views.DATES)} />
                        </NavLink>
                        <NavLink to={Views.DASHBOARD.path + Views.FAVORITES.path} style={{ textDecoration: 'none' }}>
                            <MenuItem icon={faKissWinkHeart} description="Favorites" isActive={this.props.activeView === Views.FAVORITES} onClick={() => this.props.onMenuItemClicked(Views.FAVORITES)} />
                        </NavLink>
                        <NavLink to={Views.DASHBOARD.path + Views.CHAT.path} style={{ textDecoration: 'none' }}>
                            <MenuItem icon={faComments} description="Chat" isActive={this.props.activeView === Views.CHAT}
                                onClick={this.onChatItemClicked} notifications={this.state.chatNotifications} />
                        </NavLink>
                        <NavLink to={Views.DASHBOARD.path + Views.LIKEYOU.path} style={{ textDecoration: 'none' }}>
                            <MenuItem icon={faGrinHearts} description="They like you" isActive={this.props.activeView === Views.LIKEYOU} onClick={() => this.props.onMenuItemClicked(Views.LIKEYOU)} />
                        </NavLink>
                        <MenuItem icon={faSignOutAlt} description="Sign out" onClick={() => this.onLogout(context)} />
                        <div className="splitterHorizontal" />
                        <Recommended onClick={this.onRecommendedUserClicked} />
                    </div>
                )}
            </AppContext.Consumer>
        );
    }

}
Menu.contextType = AppContext;