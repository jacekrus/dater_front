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

    render() {
        return (
            <div className="registerPanel">
                <StandardInputBox icon={faUser} placeholder="username" onInputChange={val => this.setState({username: val})}/>
                <StandardInputBox icon={faEnvelope} placeholder="email" onInputChange={val => this.setState({email: val})}/>
                <PasswordInputBox placeholder="password" onInputChange={val => this.setState({password: val})}/>
            </div>
        );
    }

}