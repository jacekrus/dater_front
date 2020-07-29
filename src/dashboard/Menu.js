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
                        <MenuItem icon={faComments} description="Chat" isActive={this.props.activeView === Views.CHAT} onClick={() => this.props.onMenuItemClicked(Views.CHAT)} />
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