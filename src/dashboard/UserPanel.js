import React, { Component } from 'react';
import './MainLayoutStyles.css';
import AppContext from '../AppContext';

export default class UserPanel extends Component {

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="editAccountPanel" onClick={this.props.onClick}>
                        <img alt="User" src="/images/miniature.jpg" className="userMiniatureImg"></img>
                        <div>
                            <div className="greetingText" title={context.state.user}>{context.state.user}</div>
                            <div className="editProfileText">Edit your profile</div>
                        </div>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }

}