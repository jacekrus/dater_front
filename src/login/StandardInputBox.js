import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class StandardInputBox extends Component {

    render() {
        const maxLength = this.props.maxLength;
        return (
            <div className="userInputBox">
                <div className="iconContainer">
                    <FontAwesomeIcon icon={this.props.icon} className="loginIcon" />
                </div>
                <div className="inputContainer">
                    <input type="text" placeholder={this.props.placeholder} maxLength={maxLength ? maxLength : 100} onChange={evt => this.props.onInputChange(evt.target.value)} title={this.props.title}/>
                </div>
            </div>
        );
    }

}