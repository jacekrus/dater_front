import React, { Component } from 'react';
import './MainLayoutStyles.css';
import FindDateView from './FindDateView';
import Views from './Views';

export default class ViewContainer extends Component {

    resolveView = () => {
        switch(this.props.activeView) {
            case Views.EDIT_PROFILE:
                return <div>Edit profile</div>
            case Views.FIND_A_DATE: 
                return <FindDateView />;
            default:

            break;
        }
    }

    render() {
        return (
            <div className="mainViewContainer">
                {this.resolveView()}
            </div>
        );
    }

}