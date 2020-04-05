import React, { Component } from 'react';
import './LoginViewStyles.css';
import './LoginRegisterPanel';
import LoginRegisterPanel from './LoginRegisterPanel';

export default class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegister: false,
        }
    }

    onLoginButtonClick() {
        this.setState((state) => (
            { isRegister: !state.isRegister }
        ))
    }

    render() {
        return (
            <div className="viewContainer">
                <div className="headerImage"/>
                <div className="loginButtonContainer">
                    <div className={"flipCardContainer" + (this.state.isRegister ? " isFlipped" : "")} onClick={() => this.onLoginButtonClick()}>
                        <div className="loginButton">Register</div>
                        <div className="loginButton loginButtonBack">Login</div>
                    </div>
                </div>
                <LoginRegisterPanel isRegister={this.state.isRegister} />
            </div>
        );
    }

}