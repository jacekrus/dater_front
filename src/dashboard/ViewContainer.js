import React, { Component } from 'react';
import './MainLayoutStyles.css';
import FindDateView from './FindDateView';
import Views from './Views';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import EditProfileView from './EditProfileView';

export default class ViewContainer extends Component {

    resolveView = () => {
        switch (this.props.activeView) {
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
                <Route exact path="/find" component={FindDateView}></Route>
                <Route exact path="/edit" component={EditProfileView}></Route>
            </div>
        );
    }

}