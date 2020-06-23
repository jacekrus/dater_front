import React, { Component } from 'react';
import './MainLayoutStyles.css';
import AppContext from '../AppContext';
import axiosRequest from '../AxiosRequest';

export default class UserPanel extends Component {

    handleEditClick = () => {
         axiosRequest.get('/users').then((resp) => console.log(resp)).catch(() => { /* do nothing */ });
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="editAccountPanel" onClick={this.props.onClick}>
                        <img alt="User" src={context.state.user.photos[0]} className="userMiniatureImg"></img>
                        <div>
                            <div className="greetingText" title={context.state.user.username}>{context.state.user.username}</div>
                            <div className="editProfileText" onClick={this.handleEditClick}>Edit your profile</div>
                        </div>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }

}