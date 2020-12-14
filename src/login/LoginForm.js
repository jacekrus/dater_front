import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PasswordInputBox from './PasswordInputBox';
import StandardInputBox from './StandardInputBox';
import AppContext from '../AppContext';
import qs from 'qs';
import axiosRequest from '../AxiosRequest';
import CustomCheckBox from './CustomCheckBox';
import { BeatLoader } from 'react-spinners';
import Popup from 'reactjs-popup';
import RestorePasswordPopup from './RestorePasswordPopup';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginClicked: false,
        }
    }

    onLoginClicked = (e, context) => {
        e.preventDefault();
        if(this.state.username === '' || this.state.password === '') {
            this.context.setError(true)
            this.context.setMessage("Username or password field is empty.")
            return;
        }
        if (!this.state.loginClicked) {
            this.setState({ loginClicked: true })
            axiosRequest.post('/datrLogin',
                qs.stringify({
                    username: this.state.username,
                    password: this.state.password
                }),
                {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                })
                .then(() => {
                    axiosRequest.get('/users/self')
                        .then((resp) => {
                            context.setUser(resp.data);
                            context.setLoggedIn(true);
                        })
                        .catch((err) => {
                            console.log("Err obj self: " + err)
                            if(err.response) {
                                console.log("Err response self: " + err.response)
                            }
                            this.setState({ loginClicked: false })
                            context.setMessage("Unable to login. Please try again later or contact site's administrator.")
                            context.setError(true);
                        })
                })
                .catch((err) => {
                    console.log("Err obj: " + err)
                    if(err.response) {
                        console.log("Err response: " + err.response)
                    }
                    this.setState({ loginClicked: false })
                    context.setError(true);
                    context.setMessage('Username or password is incorrect')
                })
        }
    }

    onRememberMeClicked = (isChecked) => {
        if(isChecked) {
            localStorage.setItem("remember-me-active", "true")
        }
        else {
            localStorage.removeItem("remember-me-active")
        }
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <form onSubmit={(e) => this.onLoginClicked(e, context)} >
                        <div className="loginPanel">
                            <StandardInputBox icon={faUser} title="Enter your username" placeholder="username" onInputChange={val => this.setState({ username: val })} />
                            <PasswordInputBox placeholder="password" onInputChange={val => this.setState({ password: val })} />

                            <div>
                                <CustomCheckBox label={"Remember me"} onCheck={this.onRememberMeClicked}/>
                                {this.state.loginClicked ? <div className="loginBeatLoader"><BeatLoader loading color={"#17BB0F"} /></div>
                                    : <button type="submit" className="formLoginButton" disabled={this.state.loginClicked} >Login</button>}
                            </div>

                            <div className="helpfulLinksContainer">
                                <div className="greenHelpfulLink" onClick={() => this.props.registerClickHandler()}>Register now</div>
                                <Popup
                                    trigger={<div className="greyHelpfulLink">Forgot password?</div>}
                                    modal
                                    position="top center"
                                >
                                    {close => (
                                        <RestorePasswordPopup onSuccess={close}/>
                                    )}
                                </Popup>
                            </div>
                        </div>
                    </form>
                )}
            </AppContext.Consumer>
        );
    }

}
LoginForm.contextType = AppContext;