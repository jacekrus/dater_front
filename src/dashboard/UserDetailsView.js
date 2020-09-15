import React, { Component } from 'react';
import axios from 'axios';
import './MainLayoutStyles.css';
import PhotoTape from './PhotoTape';
import UserInfoContainer from './UserInfoContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axiosRequest from '../AxiosRequest';
import AppContext from '../AppContext';
import { BeatLoader } from 'react-spinners';

export default class UserDetailsView extends Component {

    state = {
        photosToUpload: [],
        photosUrls: [],
        isUploading: false,
    }

    onLikeClicked = () => {
        axiosRequest.put("/users/like?id=" + this.props.selectedUser.id).catch(/* do nothing */);
    }

    onUpdateDescription = (value) => {
        axiosRequest.put("/users", {
            id: this.props.selectedUser.id,
            description: value,
        })
            .then((resp) => {
                this.context.setUser(resp.data)
            })
            .catch(() => this.displayErrorMessage("Description update failed, please try again later or contact site's administrator"))
    }

    onUpdateInterestedIn = (value) => {
        let interestedIn = value && value === 'Men' ? 'MALE' : value === 'Women' ? 'FEMALE' : null;
        axiosRequest.put("/users", {
            id: this.props.selectedUser.id,
            preference: interestedIn,
        })
            .then((resp) => {
                this.context.setUser(resp.data)
            })
            .catch(() => this.displayErrorMessage("Preference update failed. Please try again later or contact site's administrator"))
    }

    onUpdateLocation = (value) => {
        axiosRequest.put("/users", {
            id: this.props.selectedUser.id,
            location: value,
        })
            .then((resp) => {
                this.context.setUser(resp.data)
            })
            .catch(() => this.displayErrorMessage("Location update failed. Please try again later or contact site's administrator"))
    }

    onUpdatePhotos = () => {
        if (!this.state.isUploading) {
            this.setState({ isUploading: true })
            const photos = this.state.photosToUpload;
            const uploaders = photos.map((each) => {
                const data = new FormData();
                data.append("file", each);
                data.append('upload_preset', 'dater-app-storage')
                return axiosRequest.post('https://api.cloudinary.com/v1_1/dater-app/image/upload', data, { withCredentials: false })
                    .then((resp) => {
                        let arr = this.state.photosUrls;
                        this.setState({ photosUrls: [...arr, resp.data.secure_url] })
                    })
            })
            axios.all(uploaders)
                .then(() => {
                    axiosRequest.put("/users", {
                        id: this.props.selectedUser.id,
                        photos: this.state.photosUrls,
                    })
                        .then((resp) => {
                            this.context.setUser(resp.data)
                            this.setState({ isUploading: false, photosUrls: [], photosToUpload: [] })
                            //setTimeout(() => window.location.reload(), 2000)
                        })
                        .catch(() => {
                            this.onPhotoUploadError()
                        })
                })
                .catch(() => {
                    this.onPhotoUploadError()
                })
        }
    }

    onPreviewRemoved = (file) => {
        let arr = [...this.state.photosToUpload];
        const index = arr.indexOf(file);
        if (index !== -1) {
            arr.splice(index, 1);
        }
        this.setState({ photosToUpload: arr });
    }

    onPreviewReady = (file, index) => {
        const currentToUpload = this.state.photosToUpload
        if(currentToUpload[index]) {
            currentToUpload[index] = file;
            this.setState({photosToUpload: currentToUpload});
        }
        else {
            this.setState({ photosToUpload: [...currentToUpload, file] })
        }
    }

    onPhotoRemove = (index) => {
        axiosRequest.patch("/users/photos", new String(this.props.selectedUser.photos[index]))
            .then((resp) => this.context.setUser(resp.data))
            .catch((error) => {
                if (error.response && error.response.data.message) {
                    this.context.setMessage(error.response.data.message)
                    this.context.setError(true)
                }
                else {
                    this.displayErrorMessage("Error occured while removing photo. Please try again later or contact site's administrator.")
                }
            })
    }

    onProfilePictureChange = (index) => {
        axiosRequest.put("/users/photos", new String(this.props.selectedUser.photos[index]))
            .then((resp) => this.context.setUser(resp.data))
            .catch(() => this.displayErrorMessage("Error occured while setting profile photo. Please try again later or contact site's administrator."))
    }

    onPhotoUploadError = () => {
        this.setState({ isUploading: false })
        this.displayErrorMessage("Error occured while updating photos. Please try again later or contact site's administrator.")
    }

    displayErrorMessage = (message) => {
        this.context.setError(true);
        this.context.setMessage(message);
    }

    render() {
        const { selectedUser, editable } = this.props;
        let age = new Date().getFullYear() - selectedUser.dateOfBirth.substring(0, 4);
        let pref = selectedUser.preference;
        let interestedIn = pref ? pref === 'MALE' ? 'Men' : 'Women' : 'Both';
        return (
            <div>
                <div className="userDetailsTitle">{selectedUser.username}, {age}
                    {editable ? null : <FontAwesomeIcon icon={faHeart} className='userDetailsActionIcon' onClick={this.onLikeClicked} />}
                </div>
                <PhotoTape
                    user={selectedUser}
                    editable={editable}
                    onPreviewReady={this.onPreviewReady}
                    onPreviewRemoved={this.onPreviewRemoved}
                    onPhotoRemove={this.onPhotoRemove}
                    onProfilePictureChange={this.onProfilePictureChange} />
                {this.state.photosToUpload.length === 0 || this.state.isUploading ? null : <button disabled={this.isUploading} onClick={this.onUpdatePhotos} className="userInfoButton">Save</button>}
                {this.state.isUploading ? <BeatLoader loading /> : null}
                <UserInfoContainer title={"About me:"} onSaveClicked={this.onUpdateDescription} content={selectedUser.description} editable={editable} />
                <UserInfoContainer title={"Interested in:"} onSaveClicked={this.onUpdateInterestedIn} content={interestedIn} editable={editable} />
                <UserInfoContainer title={"Location:"} onSaveClicked={this.onUpdateLocation} content={selectedUser.location} editable={editable} />
            </div>
        );
    }

}
UserDetailsView.contextType = AppContext;