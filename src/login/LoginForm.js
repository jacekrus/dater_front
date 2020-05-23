import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PasswordInputBox from './PasswordInputBox';
import StandardInputBox from './StandardInputBox';
import AppContext from '../AppContext';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            username: '',
            password: '',
        }
    }

    onLoginClicked = (context) => {
        context.setLoggedIn(true)
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="loginPanel">
                        <StandardInputBox icon={faUser} title="Enter your username" placeholder="username" onInputChange={val => this.setState({ username: val })} />
                        <PasswordInputBox placeholder="password" onInputChange={val => this.setState({ password: val })} />

                        <div>
                            <div className="checkboxContainer" onClick={() => this.setState((state) => ({ isChecked: !state.isChecked }))}>
                                <div className={"checkmark" + (this.state.isChecked ? " checked" : "")}></div>
                                <div className={this.state.isChecked ? "check" : ""} />
                                <div className="checkboxLabel">Remember me</div>
                            </div>
                            <button className="formLoginButton" onClick={() => this.onLoginClicked(context)}>Login</button>
                        </div>

                        <div className="helpfulLinksContainer">
                            <div className="greenHelpfulLink" onClick={() => this.props.registerClickHandler()}>Register now</div>
                            <div className="greyHelpfulLink">Forgot password?</div>
                        </div>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }

}