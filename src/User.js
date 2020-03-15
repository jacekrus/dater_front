import React, { Component } from 'react';

export default class User extends Component {
    render(){
        return (
        <div>
            <p>{this.props.info.name}</p>
            <p>{this.props.info.password}</p>
        </div>
        );
    }
}
