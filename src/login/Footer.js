import React, { Component } from 'react';
import AppContext from '../AppContext';

export default class Footer extends Component {

    onFooterItemClicked = () => {
        this.context.setMessage("Not implemented yet.")
    }

    render() {
        return (
            <div className="footerContainer">
                <div className="footerLink" onClick={this.onFooterItemClicked}>About</div>
                <div className="footerLink" onClick={this.onFooterItemClicked}>Contact</div>
                <div className="footerLink" onClick={this.onFooterItemClicked}>Terms</div>
                <div className="copyright">2020 © Ojciedz</div>
            </div>
        );
    }

}
Footer.contextType = AppContext;

