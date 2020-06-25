import React, { Component } from 'react';
import './MainLayoutStyles.css';
import FindDateView from './FindDateView';
import Views from './Views';
import { Route, Switch } from 'react-router-dom';
import EditProfileView from './EditProfileView';
import UserDetailsView from './UserDetailsView';

export default class ViewContainer extends Component {

    render() {
        return (
            <div className="mainViewContainer">
                <Switch >
                    <Route exact path={Views.DASHBOARD.path + Views.FIND_A_DATE.path} render={(props) => <FindDateView onUserDetailsClicked={this.props.onSelectedUserChanged} {...props} />} />
                    <Route exact path={Views.DASHBOARD.path + Views.EDIT_PROFILE.path} component={EditProfileView} />
                    <Route exact path={Views.DASHBOARD.path + Views.USER_DETAILS.path + "/:id"} render={(props) => <UserDetailsView selectedUser={this.props.selectedUser} {...props} />} />
                </Switch>
            </div>
        );
    }

}