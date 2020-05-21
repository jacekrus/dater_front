import React, { Component } from 'react';
import './MainLayoutStyles.css';

export default class UserPanel extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            username: 'Kazimierz',
        }
    }

    render() {
        return (
            <div className="editAccountPanel" onClick={this.props.onClick}>
                <img alt="User" src="/images/miniature.jpg" className="userMiniatureImg"></img>
                <div>
                    <div className="greetingText" title={this.state.username}>{this.state.username}</div>
                    <div className="editProfileText">Edit your profile</div>
                </div>
            </div>
        );
    }

}