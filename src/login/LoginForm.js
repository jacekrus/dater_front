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

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isRemember: false,
            loginClicked: false,
        }
    }

    onLoginClicked = (e, context) => {
        e.preventDefault();
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
                    axiosRequest.get('/users/me')
                        .then((resp) => {
                            context.setUser(resp.data);
                            context.setLoggedIn(true);
                        })
                        .catch(() => {
                            this.setState({ loginClicked: false })
                            context.setMessage('Unable to login, please try again later')
                            context.setError(true);
                        })
                })
                .catch(() => {
                    this.setState({ loginClicked: false })
                    context.setMessage('Username or password is incorrect')
                    context.setError(true);
                })
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
                                <CustomCheckBox label={"Remember me"} />
                                {this.state.loginClicked ? <div className="loginBeatLoader"><BeatLoader loading color={"#17BB0F"} /></div>
                                    : <button type="submit" className="formLoginButton" disabled={this.state.loginClicked} >Login</button>}
                            </div>

                            <div className="helpfulLinksContainer">
                                <div className="greenHelpfulLink" onClick={() => this.props.registerClickHandler()}>Register now</div>
                                <div className="greyHelpfulLink">Forgot password?</div>
                            </div>
                        </div>
                    </form>
                )}
            </AppContext.Consumer>
        );
    }

}