import React, { Component } from 'react';
import './MainLayoutStyles.css';
import PhotoTape from './PhotoTape';
import UserInfoContainer from './UserInfoContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axiosRequest from '../AxiosRequest';
import AppContext from '../AppContext';

export default class UserDetailsView extends Component {

    constructor(props) {
        super(props);
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
        .catch(() => {/*do nothing */})
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
        .catch(() => {/*do nothing */})
    }

    onUpdateLocation = (value) => {
        axiosRequest.put("/users", {
            id: this.props.selectedUser.id,
            location: value,
        })
        .then((resp) => {
            this.context.setUser(resp.data)
        })
        .catch(() => {/*do nothing */})
    }


    render() {
        let age = new Date().getFullYear() - this.props.selectedUser.dateOfBirth.substring(0, 4);
        let pref = this.props.selectedUser.preference;
        let interestedIn = pref ? pref === 'MALE' ? 'Men' : 'Women' : 'Both';
        return (
            <div>
                <div className="userDetailsTitle">{this.props.selectedUser.username}, {age}
                    {this.props.editable ? null : <FontAwesomeIcon icon={faHeart} className='userDetailsActionIcon' onClick={this.onLikeClicked} />}
                </div>
                <PhotoTape user={this.props.selectedUser} editable={this.props.editable} />
                <UserInfoContainer title={"About me:"} onSaveClicked={this.onUpdateDescription} content={this.props.selectedUser.description} editable={this.props.editable} />
                <UserInfoContainer title={"Interested in:"} onSaveClicked={this.onUpdateInterestedIn} content={interestedIn} editable={this.props.editable} />
                <UserInfoContainer title={"Location:"} onSaveClicked={this.onUpdateLocation} content={this.props.selectedUser.location} editable={this.props.editable} />
            </div>
        );
    }

}
UserDetailsView.contextType = AppContext;