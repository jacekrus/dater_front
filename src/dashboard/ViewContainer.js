import React, { Component } from 'react';
import './MainLayoutStyles.css';
import FindDateView from './FindDateView';
import Views from './Views';
import { Route } from 'react-router-dom';
import EditProfileView from './EditProfileView';
import AppContext from '../AppContext';

export default class ViewContainer extends Component {

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="mainViewContainer">
                        <Route exact path={Views.DASHBOARD.path + Views.FIND_A_DATE.path} component={FindDateView} />
                        <Route exact path={Views.DASHBOARD.path + Views.EDIT_PROFILE.path} component={EditProfileView} />
                    </div>
                )}
            </AppContext.Consumer>
        );
    }

}