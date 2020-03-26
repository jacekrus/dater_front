import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isError: false,
        }
    }

    changeError() {
        this.setState({
            isError: !this.state.isError,
        });
    }

    render() {
        return (
            <div className="loginPanel">
                <div className="form">
                    <form className="register-form">
                        <input className={this.state.isError ? "error" : ""} type="text" placeholder="email" />
                        <input className={this.state.isError ? "error" : ""} type="password" placeholder="password" />
                        <span className="errorMessage"><i className="fa fa-user-plus"></i>Error</span>
                        <button type="button" onClick={() => this.changeError()}>Login</button>
                        <div className="message">Don't have an account? <div>Sign In</div></div>
                        <div className="message">Forgot password? <div>Send reminder</div></div>
                    </form>
                </div>
            </div>
        );
    }

}