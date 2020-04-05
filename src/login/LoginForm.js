import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            isShow: false,
            isChecked: false,
        }
    }

    changeError() {
        this.setState((state) => (
            { isError: !state.isError }
        ))
    }

    changeShow() {
        this.setState((state) => (
            { isShow: !state.isShow }
        ))
    }

    changeChecked() {
        this.setState((state) => (
            { isChecked: !state.isChecked }
        ))
    }

    render() {
        return (
            <div className="loginPanel">

                <div className="userInputBox">
                    <div className="iconContainer">
                        <FontAwesomeIcon icon={faUser} className="loginIcon" />
                    </div>
                    <div className="inputContainer">
                        <input type="text" placeholder="username" maxLength="24" />
                    </div>
                </div>

                <div className="userInputBox">
                    <div className="iconContainer">
                        <FontAwesomeIcon icon={faKey} className="loginIcon" />
                    </div>
                    <div className="inputContainer">
                        <input type={this.state.isShow ? "text" : "password"} placeholder="password" maxLength="24" />
                    </div>
                    <FontAwesomeIcon icon={this.state.isShow ? faEye : faEyeSlash} className="loginIcon cursorPointer"
                        title={this.state.isShow ? "Hide password" : "Show password"} onClick={() => this.changeShow()} />
                </div>

                <div className="additionalButtonsConatiner">
                    <div className="checkboxContainer" onClick={() => this.changeChecked()}>
                        <div className={"checkmark" + (this.state.isChecked ? " checked" : "")}></div>
                        <div className={this.state.isChecked ? "check" : ""}/>
                        <div className="checkboxLabel">Remember me</div>
                    </div>
                    <button className="formLoginButton">Login</button>
                </div>
            </div>
        );
    }

}