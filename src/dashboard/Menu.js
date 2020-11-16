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
        favoriteNotifications: 0,
        dateNotifications: 0,
        likedByNotifications: 0,
        newMessage: null,
        newFavorite: null,
        newDate: null,
        newLikedBy: null,
    }

    componentDidMount() {
        let chatNotifs = localStorage.getItem('chatNotifications-' + this.context.state.user.id);
        if (chatNotifs) {
            this.setState({ chatNotifications: parseInt(chatNotifs) })
        }
        let dateNotifs = localStorage.getItem('dateNotifications-' + this.context.state.user.id);
        if (dateNotifs) {
            this.setState({ dateNotifications: parseInt(dateNotifs) })
        }
        let favoriteNotifs = localStorage.getItem('favoriteNotifications-' + this.context.state.user.id);
        if (favoriteNotifs) {
            this.setState({ favoriteNotifications: parseInt(favoriteNotifs) })
        }
        let likedByNotifs = localStorage.getItem('likedByNotifications-' + this.context.state.user.id);
        if (likedByNotifs) {
            this.setState({ likedByNotifications: parseInt(likedByNotifs) })
        }
    }

    componentDidUpdate() {
        if (this.props.newMessage !== null && (this.state.newMessage === null || this.props.newMessage.id !== this.state.newMessage.id)) {
            if (this.props.activeView !== Views.CHAT) {
                this.setState((prevState) =>
                    ({ newMessage: this.props.newMessage, chatNotifications: prevState.chatNotifications + 1 }),
                    () => localStorage.setItem('chatNotifications-' + this.context.state.user.id, parseInt(this.state.chatNotifications)))
            }
        }
        if (this.props.newDate !== null && (this.state.newDate === null || this.props.newDate !== this.state.newDate)) {
            if (this.props.activeView !== Views.DATES) {
                this.setState((prevState) =>
                    ({ newDate: this.props.newDate, dateNotifications: prevState.dateNotifications + 1 }),
                    () => localStorage.setItem('dateNotifications-' + this.context.state.user.id, parseInt(this.state.dateNotifications)))
            }
        }
        if (this.props.newFavorite !== null && (this.state.newFavorite === null || this.props.newFavorite !== this.state.newFavorite)) {
            if (this.props.activeView !== Views.FAVORITES) {
                this.setState((prevState) =>
                    ({ newFavorite: this.props.newFavorite, favoriteNotifications: prevState.favoriteNotifications + 1 }),
                    () => localStorage.setItem('favoriteNotifications-' + this.context.state.user.id, parseInt(this.state.favoriteNotifications)))
            }
        }
        if (this.props.newLikedBy !== null && (this.state.newLikedBy === null || this.props.newLikedBy !== this.state.newLikedBy)) {
            if (this.props.activeView !== Views.LIKEYOU) {
                this.setState((prevState) =>
                    ({ newLikedBy: this.props.newLikedBy, likedByNotifications: prevState.likedByNotifications + 1 }),
                    () => localStorage.setItem('likedByNotifications-' + this.context.state.user.id, parseInt(this.state.likedByNotifications)))
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

    onFavoritesItemClicked = () => {
        this.props.onMenuItemClicked(Views.FAVORITES)
        localStorage.removeItem('favoriteNotifications-' + this.context.state.user.id)
        this.setState({ favoriteNotifications: 0 })
    }

    onDatesItemClicked = () => {
        this.props.onMenuItemClicked(Views.DATES)
        localStorage.removeItem('dateNotifications-' + this.context.state.user.id)
        this.setState({ dateNotifications: 0 })
    }

    onLikedByItemClicked = () => {
        this.props.onMenuItemClicked(Views.LIKEYOU)
        localStorage.removeItem('likedByNotifications-' + this.context.state.user.id)
        this.setState({ likedByNotifications: 0 })
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
                            <MenuItem icon={faBinoculars} description="Find a date" isActive={this.props.activeView === Views.FIND_A_DATE}
                                onClick={() => this.props.onMenuItemClicked(Views.FIND_A_DATE)} />
                        </NavLink>
                        <NavLink to={Views.DASHBOARD.path + Views.DATES.path} style={{ textDecoration: 'none' }}>
                            <MenuItem icon={faHeart} description="Dates" isActive={this.props.activeView === Views.DATES}
                                onClick={this.onDatesItemClicked} notifications={this.state.dateNotifications} />
                        </NavLink>
                        <NavLink to={Views.DASHBOARD.path + Views.FAVORITES.path} style={{ textDecoration: 'none' }}>
                            <MenuItem icon={faKissWinkHeart} description="Favorites" isActive={this.props.activeView === Views.FAVORITES}
                                onClick={this.onFavoritesItemClicked} notifications={this.state.favoriteNotifications} />
                        </NavLink>
                        <NavLink to={Views.DASHBOARD.path + Views.CHAT.path} style={{ textDecoration: 'none' }}>
                            <MenuItem icon={faComments} description="Chat" isActive={this.props.activeView === Views.CHAT}
                                onClick={this.onChatItemClicked} notifications={this.state.chatNotifications} />
                        </NavLink>
                        <NavLink to={Views.DASHBOARD.path + Views.LIKEYOU.path} style={{ textDecoration: 'none' }}>
                            <MenuItem icon={faGrinHearts} description="They like you" isActive={this.props.activeView === Views.LIKEYOU}
                                onClick={this.onLikedByItemClicked} notifications={this.state.likedByNotifications} />
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