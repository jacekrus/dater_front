import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import './SlideShow'
import SlideShow from './SlideShow';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default class LoginRegisterPanel extends Component {

    render() {
        return (
            <div className="userPanelContainer">
                <div className={"flipCardContainer" + (this.props.isRegister ? " isFlipped" : "")}>
                    <div className={"userPanel" + (this.props.isRegister ? " coveredPanel" : "")}>
                        <SlideShow />
                        <LoginForm registerClickHandler={this.props.registerClickHandler} />
                    </div>
                    <div className={"userPanel back" + (this.props.isRegister ? "" : " coveredPanel")}>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        );
    }

}
