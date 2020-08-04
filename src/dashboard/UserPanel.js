import React, { Component } from 'react';
import './MainLayoutStyles.css';
import AppContext from '../AppContext';

export default class UserPanel extends Component {

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="editAccountPanel" onClick={this.props.onClick}>
                        <img alt="User" src={context.state.user.photos[0]} className="userMiniatureImg"></img>
                        <div>
                            <div className="greetingText" title={context.state.user.username}>{context.state.user.username}</div>
                            <div className="editProfileText">Edit your profile</div>
                        </div>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }

}