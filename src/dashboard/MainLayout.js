import React, { Component } from 'react';
import './MainLayoutStyles.css';
import Menu from './Menu';
import ViewContainer from './ViewContainer';
import Footer from '../login/Footer';

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
            this.setState({selectedUser: user});
        }
    }

    render() {
        return (
            <div className="mainLayout">
                <React.Fragment>
                    <Menu activeView={this.state.activeView} onMenuItemClicked={this.onMenuItemClicked} onSelectedUserChanged={this.onSelectedUserChanged}/>
                    <ViewContainer selectedUser={this.state.selectedUser} activeView={this.state.activeView} onSelectedUserChanged={this.onSelectedUserChanged}/>
                </React.Fragment>
            </div>
        );
    }

}