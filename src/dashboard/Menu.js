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

export default class Menu extends Component {

    handleLogout = (context) => {
        axiosRequest.post('/datrLogout')
            .then(() => {
                context.setLoggedIn(false);
            })
            .catch(() => {
                //do nothing
            });
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="menu">
                        <div className="menuTitle">Dater</div>
                        <div className="splitterHorizontal"></div>
                        <NavLink to="/edit" style={{ textDecoration: 'none' }}>
                            <UserPanel onClick={() => this.props.onMenuItemClicked(Views.EDIT_PROFILE)} />
                        </NavLink>
                        <NavLink to="/find" style={{ textDecoration: 'none' }}>
                            <MenuItem icon={faBinoculars} description="Find a date" isActive={this.props.activeView === Views.FIND_A_DATE} onClick={() => this.props.onMenuItemClicked(Views.FIND_A_DATE)} />
                        </NavLink>
                        <MenuItem icon={faHeart} description="Dates" isActive={this.props.activeView === Views.DATES} onClick={() => this.props.onMenuItemClicked(Views.DATES)} />
                        <MenuItem icon={faKissWinkHeart} description="Favorites" isActive={this.props.activeView === Views.FAVORITES} onClick={() => this.props.onMenuItemClicked(Views.FAVORITES)} />
                        <MenuItem icon={faComments} description="Chat" isActive={this.props.activeView === Views.CHAT} onClick={() => this.props.onMenuItemClicked(Views.CHAT)} />
                        <MenuItem icon={faGrinHearts} description="They like you" isActive={this.props.activeView === Views.LIKEYOU} onClick={() => this.props.onMenuItemClicked(Views.LIKEYOU)} />
                        <MenuItem icon={faSignOutAlt} description="Sign out" onClick={() => this.handleLogout(context)} />
                        <div className="splitterHorizontal"></div>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }

}