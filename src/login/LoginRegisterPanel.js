import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import './SlideShow'
import SlideShow from './SlideShow';
import LoginForm from './LoginForm';

export default class LoginRegisterPanel extends Component {

    render() {
        return (
            <div className="userPanelContainer">
                <div className={"flipCardContainer" + (this.props.isRegister ? " isFlipped" : "")}>
                    <div className="userPanel">
                        <SlideShow />
                    </div>
                    <div className="userPanel back"></div>
                    <LoginForm />
                </div>
            </div>
        );
    }

}
