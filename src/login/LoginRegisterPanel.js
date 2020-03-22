import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';
import './SlideShow'
import SlideShow from './SlideShow';

export default class LoginRegisterPanel extends Component {

    render() {
        return (
            <div className="userPanelContainer">
                <div className={"flipCardContainer" + (this.props.isRegister ? " isFlipped" : "")}>
                    <div className="userPanel">
                        <SlideShow />
                    </div>
                    <div className="userPanel back"></div>
                </div>
            </div>
        );
    }

}
