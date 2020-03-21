import React, { Component } from 'react';
import './LoginViewStyles.css';

export default class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegister: false,
        }
    }

    handleRegisterSwitch() {
        this.setState({
            isRegister: !this.state.isRegister,
        });
    }

    render() {
        return (
            <div className="viewContainer">
                <div className="headerImage"/>
                <div>
                    
                </div>
                <button className="loginButton" onClick={() => this.handleRegisterSwitch()}>{this.state.isRegister ? "Login" : "Register"}</button>
            </div>
        );
    }

}