import React, { Component } from 'react';
import './MainLayoutStyles.css';
import FindDateView from './FindDateView';
import Views from './Views';
import { Route, Redirect } from 'react-router-dom';
import EditProfileView from './EditProfileView';
import AppContext from '../AppContext';

export default class ViewContainer extends Component {

    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="mainViewContainer">
                        <Route exact path="/find" render={() => (
                             context.state.loggedIn ? <FindDateView /> : <Redirect to = "/"/>      
                        )} />
                        <Route exact path="/edit" render={() => (
                             context.state.loggedIn ? <EditProfileView /> : <Redirect to = "/"/>      
                        )} />
                    </div>
                )}
            </AppContext.Consumer>
        );
    }

}