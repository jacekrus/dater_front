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
    }

    componentDidMount() {
        this.requestConversations();
    }

    requestConversations = () => {
        let currentConversations = this.state.conversations;
        axiosRequest.get('/conversations?page=' + this.state.currentPage + "&size=9")
            .then((resp) => {
                let newConversations = [...currentConversations, ...resp.data];
                if (newConversations.length > currentConversations.length) {
                    this.setState(prevState => ({ conversations: newConversations, currentPage: prevState.currentPage + 1}));
                }
                this.setState({loading: false})
            })
            .catch(() => this.handleError());
    }

    handleError = () => {
        this.context.setError(true)
        this.context.setMessage("Something went wrong. Please try again later or contact site's administrator.")
        this.setState({loading: false})
    }

    onUpdate = (values) => {
        const { scrollTop, scrollHeight, clientHeight } = values;
        if (scrollTop > this.state.scrollTop) {
            const offset = scrollHeight - clientHeight - scrollTop;
            if (offset < 1) {
                this.setState({loading: true})
                this.requestConversations();
            }
        }
        if(scrollTop !== this.state.scrollTop) {
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

    onConversationClicked = (id) => {
        this.setState({activeId: id})
        this.props.onConversationClicked(id)
    }

    render() {
        return (
            <React.Fragment>
                <div className="conversationsContainer">
                    <Scrollbars autoHide className='customScrollbar' onUpdate={this.onUpdate}>
                        {
                            this.state.conversations.map((each, index) =>
                                <div key={index} className={"conversation" + (each.id === this.state.activeId ? " conversationActive" : "")} onClick={() => this.onConversationClicked(each.id)}>
                                    <img alt="img" src={this.extractPhoto(each)} className="conversationMiniatureImg"></img>
                                    <div className='conversationUsers' title={this.extractUsernames(each)}>{this.extractUsernames(each)}</div>
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