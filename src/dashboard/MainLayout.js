import React, { Component } from 'react';
import './MainLayoutStyles.css';
import Menu from './Menu';
import ViewContainer from './ViewContainer';
import { BrowserRouter as Router } from 'react-router-dom';

export default class MainLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeView: '',
        }
    }

    onMenuItemClicked = (view) => {
        if (this.state.activeView !== view) {
            this.setState({ activeView: view });
        }
    }

    render() {
        return (
            <div className="mainLayout">
                <Menu activeView={this.state.activeView} onMenuItemClicked={(view) => this.onMenuItemClicked(view)} />
                <ViewContainer activeView={this.state.activeView} />
            </div>
        );
    }

}