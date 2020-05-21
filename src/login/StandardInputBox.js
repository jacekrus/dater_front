import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class StandardInputBox extends Component {

    render() {
        return (
            <div className="userInputBox">
                <div className="iconContainer">
                    <FontAwesomeIcon icon={this.props.icon} className="loginIcon" />
                </div>
                <div className="inputContainer">
                    <input type="text" placeholder={this.props.placeholder} maxLength="18" onChange={evt => this.props.onInputChange(evt.target.value)} title={this.props.title}/>
                </div>
            </div>
        );
    }

}