import React, { Component } from 'react';
import './MainLayoutStyles.css';
import { Scrollbars } from 'react-custom-scrollbars';
import AppContext from '../AppContext';
import { BeatLoader } from 'react-spinners';
import axiosRequest from '../AxiosRequest';

export default class ConversationsContainer extends Component {

    state = {
        currentPage: 0,
        scrollTop: 0,
        loading: true,
        conversations: [],
        activeId: null,
        newMessageId: null,
        newConversationsCount: 0,
    }

    componentDidMount() {
        this.requestConversations();
    }

    componentDidUpdate() {
        if (this.props.conversationId !== null && this.state.activeId !== this.props.conversationId) {
            this.setState({ activeId: this.props.conversationId })
        }
        if (this.props.newMessage !== null && this.props.newMessage.id !== this.state.newMessageId) {
            this.onNewMessage(this.props.newMessage)
        }
    }

    onNewMessage = (newMessage) => {
        if (newMessage.conversation.id === this.state.activeId) {
            this.updateAccesstime();
            return;
        }
        let conversationIds = this.state.conversations.map(each => each.id);
        let index = conversationIds.indexOf(newMessage.conversation.id);
        if (index !== -1) {
            let newConversations = this.state.conversations;
            let conversationWithNewMessage = this.state.conversations[index];
            conversationWithNewMessage.hasUnreadMessages = true;
            newConversations.splice(index, 1);
            this.setState({ conversations: [conversationWithNewMessage, ...newConversations] })
        }
        else {
            axiosRequest.get('/conversations/conversation?id=' + newMessage.conversation.id)
                .then((resp) => {
                    let newConvCount = this.state.newConversationsCount + 1;
                    if (newConvCount === 9) {
                        this.setState((prevState) => ({ currentPage: prevState.currentPage + 1, newConversationsCount: 0 }))
                    }
                    else {
                        this.setState({ newConversationsCount: newConvCount })
                    }
                    let loadedConversation = resp.data;
                    loadedConversation.hasUnreadMessages = true;
                    this.setState({ conversations: [loadedConversation, ...this.state.conversations] })
                })
                .catch(() => {/* Due to notifications coming at any moment, user should not get any 
                                 error message beacuse it may be confusing. After page refresh anything
                                 that was coming with notification will be loaded or server is not responsive */})
        }
        this.setState({ newMessageId: newMessage.id });
    }

    updateAccesstime = () => {
        if(this.state.activeId !== null) {
            axiosRequest.post("/conversations/access?id=" + this.state.activeId)
                .catch(() => { /* do nothing */ })
        }
    }

    requestConversations = () => {
        let currentConversations = this.state.conversations;
        axiosRequest.get('/conversations?page=' + this.state.currentPage + "&size=9&skip=" + this.state.newConversationsCount)
            .then((resp) => {
                let newConversations = [...currentConversations, ...resp.data];
                if (newConversations.length > currentConversations.length) {
                    this.setState(prevState => ({ conversations: newConversations, currentPage: prevState.currentPage + 1 }));
                }
                this.setState({ loading: false })
            })
            .catch(() => this.handleError());
    }

    handleError = () => {
        this.context.setError(true)
        this.context.setMessage("Something went wrong. Please try again later or contact site's administrator.")
        this.setState({ loading: false })
    }

    onUpdate = (values) => {
        const { scrollTop, scrollHeight, clientHeight } = values;
        if (scrollTop > this.state.scrollTop) {
            const offset = scrollHeight - clientHeight - scrollTop;
            if (offset < 1) {
                this.setState({ loading: true })
                this.requestConversations();
            }
        }
        if (scrollTop !== this.state.scrollTop) {
            this.setState({ scrollTop: scrollTop });
        }
    }

    extractPhoto = (conversation) => {
        let convUsers = conversation.users.filter(user => user.photos !== null && user.id !== this.context.state.user.id);
        if (convUsers.length < 1) {
            return "img";
        }
        return convUsers[0].photos[0];
    }

    extractUsernames = (conversation) => {
        return conversation.users.map(each => each.username).join(', ');
    }

    onConversationClicked = (conversation) => {
        if (this.state.activeId !== conversation.id) {
            this.setState({ activeId: conversation.id })
            conversation.hasUnreadMessages = false;
            this.props.onConversationClicked(conversation.id)
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="conversationsContainer">
                    <Scrollbars autoHide className='customScrollbar' onUpdate={this.onUpdate}>
                        {
                            this.state.conversations.map((each, index) =>
                                <div key={index} className={"conversation" + (each.id === this.state.activeId ? " conversationActive" : "")} onClick={() => this.onConversationClicked(each)}>
                                    <img alt="img" src={this.extractPhoto(each)} className="conversationMiniatureImg"></img>
                                    <div className={'conversationUsers ' + (each.hasUnreadMessages ? 'bold' : "")} title={this.extractUsernames(each)}>{this.extractUsernames(each)}</div>
                                    {each.hasUnreadMessages ? <div className="newMessageIndicator" title="New message received!"></div> : null}
                                </div>
                            )
                        }
                        <div className="loadingCenter"><BeatLoader loading={this.state.loading} color={"#17BB0F"} /></div>
                    </Scrollbars>
                </div>

            </React.Fragment>
        );
    }

}
ConversationsContainer.contextType = AppContext;