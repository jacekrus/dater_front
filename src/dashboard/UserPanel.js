import React, { Component } from 'react';
import './MainLayoutStyles.css';
import AppContext from '../AppContext';
import axios from 'axios';
import axiosRequest from '../AxiosRequest';

export default class UserPanel extends Component {

    handleEditClick = () => {
         axiosRequest.get('/users').then((resp) => console.log(resp)).catch((err) => console.log("Users get failed" + err));
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="editAccountPanel" onClick={this.props.onClick}>
                        <img alt="User" src="/images/miniature.jpg" className="userMiniatureImg"></img>
                        <div>
                            <div className="greetingText" title={context.state.user}>{context.state.user}</div>
                            <div className="editProfileText" onClick={this.handleEditClick}>Edit your profile</div>
                        </div>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }

}