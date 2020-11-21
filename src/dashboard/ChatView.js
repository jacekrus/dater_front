import React, { Component } from 'react';
import './MainLayoutStyles.css';
import ConversationsContainer from './ConversationsContainer';
import MessagesContainer from './MessagesContainer';

export default class ChatView extends Component {

    state = {
        conversationId: null,
    }

    componentDidUpdate() {
        if(this.props.conversationId !== null && this.state.conversationId !== this.props.conversationId) {
            this.onConversationClicked(this.props.conversationId);
            this.props.onChatViewRendered();
        }
    }

    onConversationClicked = (id) => {
        if(id !== this.state.conversationId) {
            this.setState({conversationId: id})
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="chatView">
                    <ConversationsContainer onConversationClicked={this.onConversationClicked} conversationId={this.state.conversationId} newMessage={this.props.newMessage}/>
                    <MessagesContainer onMenuItemClicked={this.props.onMenuItemClicked} conversationId={this.state.conversationId} newMessage={this.props.newMessage}/>
                </div>
            </React.Fragment>
        );
    }

}