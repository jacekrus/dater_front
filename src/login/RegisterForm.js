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
import PhotoUploadFrame from './PhotoUploadFrame';
import { BeatLoader } from 'react-spinners';

export default class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordRetype: '',
            date: '',
            location: '',
            photo: null,
            isMale: '',
            createClicked: false,
            resetForm: false,
        }
    }

    onCreateAccount = (context) => {
        if (!this.state.createClicked) {
            if (this.isAnyValueEmpty()) {
                context.setMessage("Please fill in all personal information form fields.")
                context.setError(true)
                return;
            }
            if(this.state.password !== this.state.passwordRetype) {
                context.setMessage("Passwords do not match.")
                context.setError(true)
                return;
            }
            if (this.state.photo === null) {
                context.setMessage("Please add a photo.")
                context.setError(true)
                return;
            }

            this.createNewAccount(context);
        }
    }

    createNewAccount = (context) => {
        this.validateUserData(context);
    }

    validateUserData = (context) => {
        this.setState({ createClicked: true })
        let gender = this.state.isMale ? 'MALE' : 'FEMALE';
        axiosRequest.post('users/validate',
            {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                dateOfBirth: this.state.date,
                location: this.state.location,
                gender: gender,
            })
            .then(() => this.uploadImage(context))
            .catch(error => {
                this.displayError(error, context);
            })
    }

    uploadImage = (context) => {
        const data = new FormData();
        data.append('file', this.state.photo);
        data.append('upload_preset', 'dater-app-storage')
        axiosRequest.post('https://api.cloudinary.com/v1_1/dater-app/image/upload', data, { withCredentials: false })
            .then((resp) => {
                this.createUser(context, resp.data.secure_url)
            })
            .catch((error) => {
                this.displayError(error, context);
            })
    }

    createUser = (context, photoUrl) => {
        let gender = this.state.isMale ? 'MALE' : 'FEMALE';
        axiosRequest.post('/users/add',
            {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                dateOfBirth: this.state.date,
                location: this.state.location,
                gender: gender,
                photos: [photoUrl]
            })
            .then(() => {
                this.setState({ createClicked: false })
                context.setMessage("Your account has been successfully created. You can now login to your account.")
                this.setState({resetForm: true, username: '', email: '', password: '', date: '', loaction: '', photo: null, isMale: ''}, () => this.setState({resetForm: false}))
                setTimeout(() => window.location.reload(), 3000)
            })
            .catch(error => {
                this.displayError(error, context);
            })
    }

    displayError = (error, context) => {
        this.setState({ createClicked: false })
        context.setError(true)
        if (error.response && error.response.data.message) {
            context.setMessage(error.response.data.message)
        }
        else {
            context.setMessage("Unexpected error occured, please try again later or contact site's administrator.")
        }
    }

    isAnyValueEmpty = () => {
        return this.state.username === '' || this.state.email === '' || this.state.password === '' || this.state.date === ''
            || this.state.location === '' || this.state.isMale === '' || this.state.photo === '' || this.state.passwordRetype === '';
    }

    render() {
        const dateInputEmpty = this.state.date.trim() === "";
        const {createClicked} = this.state;
        return (
            <AppContext.Consumer>
                {(context) => (
                    <React.Fragment>
                        <div className="registerPanelContainer">
                            <div className="registerPanelTitle left">Personal information</div>
                            <div className="registerPanel">
                                <StandardInputBox icon={faUser} title="Enter your username" placeholder="username" onInputChange={val => this.setState({ username: val })} maxLength={18} reset={this.state.resetForm}/>
                                <StandardInputBox icon={faEnvelope} title="Enter your email" placeholder="email" maxLength={320} onInputChange={val => this.setState({ email: val })} reset={this.state.resetForm}/>
                                <PasswordInputBox placeholder="password" onInputChange={val => this.setState({ password: val })} reset={this.state.resetForm}/>
                                <PasswordInputBox placeholder="retype password" onInputChange={val => this.setState({ passwordRetype: val })} reset={this.state.resetForm}/>
                                <DatePickerBox style={dateInputEmpty ? "dateInputEmpty" : "dateInput"} onInputChange={val => this.setState({ date: val })} reset={this.state.resetForm}/>
                                <StandardInputBox icon={faMapMarkedAlt} title="Enter your location (country city)" maxLength={40} placeholder="location" onInputChange={val => this.setState({ location: val })} reset={this.state.resetForm}/>
                                <GenderPicker isMale={(bool) => this.setState({ isMale: bool })} reset={this.state.resetForm}/>
                                {createClicked ? null : <button className="registerButton" disabled={this.state.createClicked} onClick={() => this.onCreateAccount(context)}>Create account</button>}
                                {createClicked ? <BeatLoader loading color={"#17BB0F"}/> : null }
                            </div>
                        </div>
                        <div className="splitter" />
                        <div className="imageUploadContainer">
                            <div className="registerPanelTitle right">Photo</div>
                            <div className="registerPanelContainer">
                                <PhotoUploadFrame onPreviewReady={(file) => this.setState({ photo: file })} reset={this.state.resetForm} />
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </AppContext.Consumer>
        );
    }

}