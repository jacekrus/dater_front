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
                <React.Fragment>
                    <Menu activeView={this.state.activeView} onMenuItemClicked={(view) => this.onMenuItemClicked(view)} />
                    <ViewContainer activeView={this.state.activeView} />
                </React.Fragment>
            </div>
        );
    }

}