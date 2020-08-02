import React, { Component } from 'react';
import './MainLayoutStyles.css';
import Menu from './Menu';
import ViewContainer from './ViewContainer';
import Views from './Views';

export default class MainLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeView: '',
            selectedUser: {}
        }
    }

    onMenuItemClicked = (view) => {
        if (this.state.activeView !== view) {
            this.setState({ activeView: view });
        }
    }

    onSelectedUserChanged = (user) => {
        if(!this.selectedUser || this.selectedUser.id !== user.id) {
            this.setState({selectedUser: user, activeView: Views.USER_DETAILS});
        }
    }

    render() {
        return (
            <div className="mainLayout">
                <React.Fragment>
                    <Menu activeView={this.state.activeView} onMenuItemClicked={this.onMenuItemClicked} onSelectedUserChanged={this.onSelectedUserChanged}/>
                    <ViewContainer selectedUser={this.state.selectedUser} onMenuItemClicked={this.onMenuItemClicked} activeView={this.state.activeView} onSelectedUserChanged={this.onSelectedUserChanged}/>
                </React.Fragment>
            </div>
        );
    }

}