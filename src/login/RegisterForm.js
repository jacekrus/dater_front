import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import StandardInputBox from './StandardInputBox';
import PasswordInputBox from './PasswordInputBox';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        }
    }

    handleButton = () => {
        console.log('Username ' + this.state.username);
        console.log('Email ' + this.state.email);
        console.log('Password ' + this.state.password);
    }

    onUsernameChange = (inputValue) => {
        this.setState({
            username: inputValue,
        })
    }

    render() {
        return (
            <div className="registerPanel">
                <StandardInputBox icon={faUser} placeholder="username" onInputChange={this.onUsernameChange}/>
                <StandardInputBox icon={faEnvelope} placeholder="email"/>
                <PasswordInputBox placeholder="password"/>
                <button onClick={this.handleButton}>Click me</button>
            </div>
        );
    }

}