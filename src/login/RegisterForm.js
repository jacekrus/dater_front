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

export default class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            date: '',
            location: '',
            photo: null,
            isMale: '',
            createClicked: false,
        }
    }

    onCreateAccount = (context) => {
        if (!this.state.createClicked) {
            if (this.isAnyValueEmpty()) {
                context.setMessage("Please fill in all personal information form's fields.")
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
        context.setMessage('Please wait, your account is being created.')
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
                // this.setState({
                //     username: '',
                //     email: '',
                //     password: '',
                //     date: '',
                //     location: '',
                //     photo: null,
                //     photoUrl: '',
                //     isMale: '',
                //     createClicked: false,
                // })
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
            || this.state.location === '' || this.state.isMale === '' || this.state.photo === ''
    }

    render() {
        const dateInputEmpty = this.state.date.trim() === "";
        return (
            <AppContext.Consumer>
                {(context) => (
                    <React.Fragment>
                        <div className="registerPanelContainer">
                            <div className="registerPanelTitle left">Personal information</div>
                            <div className="registerPanel">
                                <StandardInputBox icon={faUser} title="Enter your username" placeholder="username" onInputChange={val => this.setState({ username: val })} maxLength={18}/>
                                <StandardInputBox icon={faEnvelope} title="Enter your email" placeholder="email" onInputChange={val => this.setState({ email: val })} />
                                <PasswordInputBox placeholder="password" onInputChange={val => this.setState({ password: val })} maxLength={40}/>
                                <DatePickerBox style={dateInputEmpty ? "dateInputEmpty" : "dateInput"} onInputChange={val => this.setState({ date: val })} />
                                <StandardInputBox icon={faMapMarkedAlt} title="Enter your location (country city)" maxLength={40} placeholder="location" onInputChange={val => this.setState({ location: val })} />
                                <GenderPicker isMale={(bool) => this.setState({ isMale: bool })} />
                                <button className="registerButton" disabled={this.state.createClicked} onClick={() => this.onCreateAccount(context)}>Create account</button>
                            </div>
                        </div>
                        <div className="splitter" />
                        <div className="imageUploadContainer">
                            <div className="registerPanelTitle right">Photo</div>
                            <div className="registerPanelContainer">
                                <PhotoUploadFrame onPreviewReady={imgSrc => this.setState({ photo: imgSrc })} />
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </AppContext.Consumer>
        );
    }

}