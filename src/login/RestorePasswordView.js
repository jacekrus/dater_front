import React, { Component } from 'react';
import AppContext from '../AppContext';
import axiosRequest from '../AxiosRequest';
import Views from '../dashboard/Views';
import PasswordInputBox from './PasswordInputBox';
import { BeatLoader } from 'react-spinners';

export default class RestorePasswordView extends Component {

    state = {
        password: '',
        retypepassword: '',
        loading: true,
        passResetData: null,
        processingReset: false,
    }

    componentDidMount() {
        this.requestResetPage();
    }

    requestResetPage() {
        let currentLocation = this.props.location.pathname;
        let pageId = currentLocation.substring(currentLocation.lastIndexOf('/') + 1);
        axiosRequest.get("/passwords?id=" + pageId)
            .then(resp => {
                this.setState({ loading: false, passResetData: resp.data })
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    this.props.history.push("/404")
                }
                else {
                    this.showError("Something went wrong. Please try again later or contact site's administrator.")
                }
            })
    }

    requestPasswordReset = () => {
        let pass = this.state.password;
        let retype = this.state.retypepassword;
        if (pass === '' || retype === '') {
            this.showError("Please fill in both password fields.")
            return;
        }
        if (pass !== retype) {
            this.showError("Passwords do not match.")
        }
        this.setState({processingReset: true})
        axiosRequest.post("/passwords/reset", {
            email: this.state.passResetData.email,
            password: this.state.password,
        })
            .then((resp) => {
                this.context.setMessage("Password has been successfully reset. You may now login to your account [" + resp.data.username + "] using the new password.")
                this.setState({processingReset: false})
                setTimeout(() => this.props.history.push(Views.LOGIN.path), 3500)
            })
            .catch((error) => {
                if(error.response && error.response.data) {
                    this.showError(error.response.data.message)
                }
                else {
                    this.showError("Something went wrong. Please try again later or contact site's administrator.")
                }
                this.setState({processingReset: false})
            })
    }

    showError = (msg) => {
        this.context.setError(true);
        this.context.setMessage(msg)
    }

    render() {
        const data = this.state.passResetData;
        const createTime = data ? data.createTime : "";
        const email = data ? data.email : "";
        const date = new Date(createTime).toLocaleDateString("en-US") + ", " + new Date(createTime).toLocaleTimeString("en-US");
        return (
            <div className="passwordResetView">
                {
                    this.state.loading ? <BeatLoader loading /> :
                        <React.Fragment>
                            <div className="restoreIntructionText restoreViewText">Set up your new password</div>
                            <PasswordInputBox placeholder="new password" onInputChange={val => this.setState({ password: val })} />
                            <PasswordInputBox placeholder="retype new password" onInputChange={val => this.setState({ retypepassword: val })} />
                            {this.state.processingReset ? <div className="loginBeatLoader"><BeatLoader loading color={"#17BB0F"} /></div>
                                : <button className="formLoginButton" disabled={this.state.processingReset} onClick={this.requestPasswordReset}>Reset</button>}
                            <div className="floatNone" />
                            <div className="restoreIntructionText textAlignCenter">Password reset was requested for: <br /> {email} <br /> on: {date} </div>
                        </React.Fragment>
                }
            </div>
        );
    }

}
RestorePasswordView.contextType = AppContext;