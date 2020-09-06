import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import StandardInputBox from './StandardInputBox';
import PasswordInputBox from './PasswordInputBox';
import DatePickerBox from './DatePickerBox';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import GenderPicker from './GenderPicker';

export default class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            date: '',
            location: '',
            isMale: '',
        }
    }

    render() {
        const dateInputEmpty = this.state.date.trim() === "";
        return (
            <div className="registerPanel">
                <StandardInputBox icon={faUser} title="Enter your username" placeholder="username" onInputChange={val => this.setState({ username: val })} />
                <StandardInputBox icon={faEnvelope} title="Enter your email" placeholder="email" onInputChange={val => this.setState({ email: val })} />
                <PasswordInputBox placeholder="password" onInputChange={val => this.setState({ password: val })} />
                <DatePickerBox style={dateInputEmpty ? "dateInputEmpty" : "dateInput"} onInputChange={val => this.setState({ date: val })} />
                <StandardInputBox icon={faMapMarkedAlt} title="Enter your location (country, city)" placeholder="location" onInputChange={val => this.setState({ location: val })} />
                <GenderPicker isMale={(bool) => this.setState({isMale: bool})}/>
                <button className="registerButton" onClick={() => console.log(this.state.date)}>Create account</button>
            </div>
        );
    }

}