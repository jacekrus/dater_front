import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PasswordInputBox from './PasswordInputBox';
import StandardInputBox from './StandardInputBox';

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
    
    render() {
        return (
            <div className="loginPanel">

                <StandardInputBox icon={faUser} placeholder="username"/>

                <PasswordInputBox placeholder="password"/>

                <div>
                    <div className="checkboxContainer" onClick={() => this.setState((state) => ({ isChecked: !state.isChecked }))}>
                        <div className={"checkmark" + (this.state.isChecked ? " checked" : "")}></div>
                        <div className={this.state.isChecked ? "check" : ""}/>
                        <div className="checkboxLabel">Remember me</div>
                    </div>
                    <button className="formLoginButton">Login</button>
                </div>

                <div className="helpfulLinksContainer">
                    <div className="greenHelpfulLink" onClick = {() => this.props.registerClickHandler()}>Register now</div>
                    <div className="greyHelpfulLink">Forgot password?</div>
                </div>
            </div>
        );
    }

}