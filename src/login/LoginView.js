import React, { Component } from 'react';
import './LoginViewStyles.css';

export default class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegister: false,
        }
    }

    onLoginButtonClick() {
        this.setState({
            isRegister: !this.state.isRegister,
        });
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
            </div>
        );
    }

}