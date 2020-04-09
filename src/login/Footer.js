import React, { Component } from 'react';

export default class Footer extends Component {

    render() {
        return (
            <div className="footerContainer">
                <div className="footerLink">About</div>
                <div className="footerLink">Contact</div>
                <div className="footerLink">Terms</div>
                <div className="copyright">2020 © Ojciedz</div>
            </div>
        );
    }

}