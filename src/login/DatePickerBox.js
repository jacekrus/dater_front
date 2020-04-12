import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class DatePickerBox extends Component {

    render() {
        return (
            <div className="userInputBox">
                <div className="iconContainer">
                    <FontAwesomeIcon icon={faCalendarAlt} className="loginIcon" />
                </div>
                <div className="inputContainer">
                    <input className={this.props.style} type="date" title="Enter your birth date" onChange={evt => this.props.onInputChange(evt.target.value)} />
                </div>
            </div>
        );
    }

}