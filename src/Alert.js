import React, { Component } from 'react';
import './App.css';
import AppContext from './AppContext';

export default class Alert extends Component {

    onAlertClose = () => {
        this.context.setError(false);
        this.context.setMessage('');
    }

    render() {
        let {message, error} = this.context.state;
        return (
            <div className={message !== '' ? "alertBox " + (error ? "alertBoxError" : "alertBoxInfo") : "alertBoxHidden"}>
                <span className="closebtn" onClick={this.onAlertClose}>&times;</span>
                <strong>{error ? 'ERROR: ' : 'INFO: '} </strong> {message}
            </div>
        );
    }
}
Alert.contextType = AppContext;