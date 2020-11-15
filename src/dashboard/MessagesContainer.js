import React, { Component } from 'react';
import './MainLayoutStyles.css';
import AppContext from '../AppContext';
import { NavLink } from 'react-router-dom';
import Views from './Views';
import ChatPanel from './ChatPanel';

export default class MessagesContainer extends Component {

    render() {
        return (
            <div className="messagesContainer">
                {this.props.conversationId ? <ChatPanel conversationId={this.props.conversationId} newMessage={this.props.newMessage} /> :
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