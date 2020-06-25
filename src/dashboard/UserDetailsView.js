import React, { Component } from 'react';
import './MainLayoutStyles.css';

export default class UserDetailsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div >
                <div>{this.props.selectedUser.username}</div>
            </div>
        );
    }

}