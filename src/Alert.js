import React, { Component } from 'react';
import './App.css';
import AppContext from './AppContext';

export default class Alert extends Component {

    state = {
        isVisible: this.context.state.message !== '',
    }

    componentDidMount() {
        console.log('msg: ' + this.context.state.message)
    }

    onAlertClose = () => {
        this.context.setError(false);
        this.context.setMessage('');
        this.setState({isVisible: false})
    }

    render() {
        return (
            <div className={this.state.isVisible ? "alertBox " + (this.props.error ? "alertBoxError" : "alertBoxInfo") : "alertBoxHidden"}>
                <span className="closebtn" onClick={this.onAlertClose}>&times;</span>
                <strong>{this.context.state.error ? 'ERROR: ' : 'INFO: '} </strong> {this.context.state.message}
            </div>
        );
    }
}
Alert.contextType = AppContext;