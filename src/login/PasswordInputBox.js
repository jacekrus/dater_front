import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class PasswordInputBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
        }
    }

    render() {
        return (
            <div className="userInputBox">
                <div className="iconContainer">
                    <FontAwesomeIcon icon={faKey} className="loginIcon" />
                </div>
                <div className="inputContainer">
                    <input type={this.state.isShow ? "text" : "password"} placeholder={this.props.placeholder} maxLength="24" />
                </div>
                <FontAwesomeIcon icon={this.state.isShow ? faEye : faEyeSlash} className="loginIcon cursorPointer"
                    title={this.state.isShow ? "Hide password" : "Show password"} onClick={() => this.setState((state) => ({ isShow: !state.isShow }))} />
            </div>
        );
    }

}