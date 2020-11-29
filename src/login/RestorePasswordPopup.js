import React, { Component } from 'react';
import AppContext from '../AppContext';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import StandardInputBox from './StandardInputBox';
import { BeatLoader } from 'react-spinners';
import axiosRequest from '../AxiosRequest';

export default class RestorePasswordPopup extends Component {

    state = {
        email: '',
        loading: false,
        errorText: null,
    }

    onSend = () => {
        if(this.state.email === '') {
            setTimeout(() => this.setState({errorText: "Email input is empty."}), 0)
            return;
        }
        this.setState({loading: true}, () => {
            axiosRequest.post('/passwords', {
                email: this.state.email
            }).then((response) => this.onSuccess(response)).catch((error) => this.onError(error))
        })
    }

    onSuccess = (response) => {
        this.setState({loading: false})
        if(response.status === 201) {
            this.context.setMessage("You will receive a password reset link shortly. Please check your email.")
        }
        if(response.data && response.data !== '' && response.status !== 201) {
            this.context.setMessage(response.data)
        }
        this.props.onSuccess()
    }

    onError = (error) => {
        let errorTxt = error.response && error.response.data ? error.response.data.message : "Something went wrong. Please try again later or contact site's administrator.";
        this.setState({errorText: errorTxt, loading: false})
    }

    render() {
        return (
            <div className="forgotPasswordPopup" onClick={() => this.setState({errorText: null})}>
                <div className="restoreIntructionText">Type in your email and click send to generate password restore link.</div>
                <div className="emailInputContainer">
                    <StandardInputBox icon={faEnvelope} title="Enter your email" placeholder="email" onInputChange={val => this.setState({ email: val })} />
                </div>
                <div className="sendButtonContainer">
                    {this.state.loading ? <div className="loginBeatLoader"><BeatLoader loading color={"#17BB0F"} /></div>
                        : <button className="formLoginButton" disabled={this.state.loading} onClick={this.onSend}>Send</button>}
                </div>
                <div className="restorePasswordErrorText">
                    {this.state.errorText}
                </div>
            </div>
        );
    }

}
RestorePasswordPopup.contextType = AppContext;