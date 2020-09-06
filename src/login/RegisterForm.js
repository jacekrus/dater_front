import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import StandardInputBox from './StandardInputBox';
import PasswordInputBox from './PasswordInputBox';
import DatePickerBox from './DatePickerBox';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import AppContext from '../AppContext';
import GenderPicker from './GenderPicker';
import axiosRequest from '../AxiosRequest';

export default class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            date: '',
            location: '',
            photos: ['https://www.wykop.pl/cdn/c3201142/comment_xGzPTCePZe26dWY0HySM0QCZGyAyS0HC.jpg'],
            isMale: '',
            createClicked: false,
        }
    }

    onCreateAccount = (context) => {
        if (!this.state.createClicked) {
            if (this.isAnyValueEmpty()) {
                context.setMessage("Please fill in all form's fields.")
                context.setError(true)
                return;
            }
            this.sendCreateUserRequest(context);
        }
    }

    isAnyValueEmpty = () => {
        return this.state.username === '' || this.state.email === '' || this.state.password === '' || this.state.date === ''
            || this.state.location === '' || this.state.isMale === '' || this.state.photos === ''
    }

    sendCreateUserRequest = (context) => {
        this.setState({ createClicked: true })
        let gender = this.state.isMale ? 'MALE' : 'FEMALE';
        axiosRequest.post('/users/add',
            {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                dateOfBirth: this.state.date,
                location: this.state.location,
                gender: gender,
                photos: this.state.photos,
            })
            .then(resp => console.log("User created"))
            .catch(error => {
                this.setState({ createClicked: false })
                if(error.response.data) {
                    context.setMessage(error.response.data.message)
                }
                context.setError(true)
            })
    }

    render() {
        const dateInputEmpty = this.state.date.trim() === "";
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="registerPanel">
                        <StandardInputBox icon={faUser} title="Enter your username" placeholder="username" onInputChange={val => this.setState({ username: val })} />
                        <StandardInputBox icon={faEnvelope} title="Enter your email" placeholder="email" onInputChange={val => this.setState({ email: val })} />
                        <PasswordInputBox placeholder="password" onInputChange={val => this.setState({ password: val })} />
                        <DatePickerBox style={dateInputEmpty ? "dateInputEmpty" : "dateInput"} onInputChange={val => this.setState({ date: val })} />
                        <StandardInputBox icon={faMapMarkedAlt} title="Enter your location (country city)" placeholder="location" onInputChange={val => this.setState({ location: val })} />
                        <GenderPicker isMale={(bool) => this.setState({ isMale: bool })} />
                        <button className="registerButton" disabled={this.state.createClicked} onClick={() => this.onCreateAccount(context)}>Create account</button>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }

}