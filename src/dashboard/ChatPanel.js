import React, { Component } from 'react';
import './MainLayoutStyles.css';
import { Scrollbars } from 'react-custom-scrollbars';
import AppContext from '../AppContext';
import { NavLink } from 'react-router-dom';
import Views from './Views';

export default class ChatPanel extends Component {

    render() {
        return (
            <div className="chatPanel">
                {this.props.conversation ? "emtpy" :
                    <div className="noConversationFoundText">
                            Select conversation on the left or head to
                         <NavLink to={Views.DASHBOARD.path + Views.DATES.path}
                            style={{ textDecoration: 'none' }}
                            onClick={() => this.props.onMenuItemClicked(Views.DATES)}>
                             Dates 
                        </NavLink>
                            and start a new one.
                    </div>
                }
            </div>
        );
    }

}
ChatPanel.contextType = AppContext;