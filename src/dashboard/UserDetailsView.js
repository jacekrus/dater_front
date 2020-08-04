import React, { Component } from 'react';
import './MainLayoutStyles.css';
import PhotoTape from './PhotoTape';
import UserInfoContainer from './UserInfoContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axiosRequest from '../AxiosRequest';

export default class UserDetailsView extends Component {

    onLikeClicked = () => {
        axiosRequest.put("/users/like?id=" + this.props.selectedUser.id).catch(/* do nothing */);
    }

    render() {
        let age = new Date().getFullYear() - this.props.selectedUser.dateOfBirth.substring(0,4);
        let pref = this.props.selectedUser.preference;
        let interestedIn = pref ? pref === 'MALE' ? 'Men' : 'Women' : 'Both';
        return (
            <div >
                <div className="userDetailsTitle">{this.props.selectedUser.username}, {age}
                    {this.props.editable ? null : <FontAwesomeIcon icon={faHeart} className='userDetailsActionIcon' onClick={this.onLikeClicked} /> }
                </div>
                <PhotoTape user={this.props.selectedUser} editable={this.props.editable}/>
                <UserInfoContainer title={"About me:"} content={this.props.selectedUser.description} editable={this.props.editable}/>
                <UserInfoContainer title={"Interested in:"} content={interestedIn} editable={this.props.editable}/>
                <UserInfoContainer title={"Location:"} content={this.props.selectedUser.location} editable={this.props.editable}/>
            </div>
        );
    }

}