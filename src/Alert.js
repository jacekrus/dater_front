import React, { Component } from 'react';
import './App.css';
import AppContext from './AppContext';

export default class Alert extends Component {

    onAlertClose = () => {
        this.context.setMessage('');
        this.context.setError(false);
        clearTimeout(this.timer);
        this.timer = null;
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    componentDidUpdate() {
        if(!this.timer && this.context.state.message !== '') {
            this.timer = setTimeout(() => this.onAlertClose(), 6000);
        }
    }

    handleClick = (e) => {
        if(!this.node.contains(e.target)) {
            if(this.timer && this.context.state.message !== '') {
                this.onAlertClose();
            }
        }
    }

    render() {
        let {message, error} = this.context.state;
        return (
            <div ref={node => this.node = node} className={message !== '' ? "alertBox " + (error ? "alertBoxError" : "alertBoxInfo") : "alertBoxHidden"}>
                <span className="closebtn" onClick={this.onAlertClose}>&times;</span>
                <strong>{error ? 'ERROR: ' : 'INFO: '} </strong> {message}
            </div>
        );
    }
}
Alert.contextType = AppContext;