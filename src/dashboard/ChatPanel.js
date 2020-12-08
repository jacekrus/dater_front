import React, { Component } from 'react';
import './MainLayoutStyles.css';
import axiosRequest from '../AxiosRequest';
import AppContext from '../AppContext';
import { Scrollbars } from 'react-custom-scrollbars';
import { BeatLoader } from 'react-spinners';
import SendMessageBox from './SendMessageBox';
import MessageBubbleContainer from './MessageBubbleContainer';
import ScrollBottomIcon from './ScrollBottomIcon';

export default class ChatPanel extends Component {

    scrollbars = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            currentId: this.props.conversationId,
            currentPage: 0,
            loading: true,
            resetInput: false,
            newMessagesCount: 0,
            newMessage: this.props.newMessage,
            buttonVisible: false,
        }
        this.scrollTop = 0
        this.scrollHeight = 0
        this.blockScroll = false
    }

    componentDidMount() {
        this.requestMessages();
    }

    componentDidUpdate() {
        if (this.state.currentId !== this.props.conversationId) {
            this.setState({ messages: [], currentId: this.props.conversationId, currentPage: 0, newMessagesCount: 0 }, () => this.requestMessages());
            this.scrollTop = 0
            this.scrollHeight = 0
        }
        if (this.props.newMessage !== null && (this.state.newMessage === null || this.props.newMessage.id !== this.state.newMessage.id)) {
            if (this.props.newMessage.conversation.id === this.state.currentId) {
                this.setState({ newMessage: this.props.newMessage }, () => this.onMessageReceived(this.props.newMessage))
            }
        }
    }

    onMessageReceived = (msg) => {
        this.updateNewMessagesCount();
        this.blockScroll = true
        this.setState({ messages: [...this.state.messages, msg] }, () => this.scrollbars.current.scrollToBottom())
    }

    requestMessages() {
        axiosRequest.get('/conversations/messages?id=' + this.props.conversationId + '&page=' + this.state.currentPage + '&size=20&skip=' + this.state.newMessagesCount)
            .then((resp) => {
                let msgs = resp.data.map((val, idx, arr) => arr[arr.length - 1 - idx]);
                this.setState((prevState) => ({ messages: [...msgs, ...this.state.messages], currentPage: prevState.currentPage + 1 }), () => this.adjustScrollPosition(0));
                this.setState({ loading: false })
            })
            .catch(() => this.handleError());
    }

    handleError = () => {
        this.context.setError(true)
        this.context.setMessage("Unable to load more messages. Please try again later or contact site's administrator.")
        this.setState({ loading: false })
    }

    adjustScrollPosition = (scrollHeight) => {
        if (this.state.currentPage === 1) {
            this.scrollbars.current.scrollToBottom()
        }
        else if (scrollHeight > 0) {
            this.scrollbars.current.scrollTop(scrollHeight)
        }
    }

    onUpdate = (values) => {
        const { scrollTop, scrollHeight } = values;
        if (scrollHeight > this.scrollHeight) {
            if (this.blockScroll) {
                this.blockScroll = false
            }
            else {
                this.adjustScrollPosition(scrollHeight - this.scrollHeight)
            }
        }
        else if (scrollTop < this.scrollTop && scrollTop < 1 && !this.state.loading) {
            this.setState({ loading: true }, () => this.requestMessages())
        }
        this.scrollTop = scrollTop;
        this.scrollHeight = scrollHeight;
    }

    onScrollStop = () => {
        let clientHeight = 630;
        if (this.scrollHeight - (this.scrollTop + clientHeight) > 500 && !this.state.buttonVisible) {
            this.setState({ buttonVisible: true })
        }
        else if (this.scrollHeight - (this.scrollTop + clientHeight) < 500 && this.state.buttonVisible) {
            this.setState({ buttonVisible: false })
        }
    }

    onMessageSend = (e, msg) => {
        if (e) {
            e.preventDefault();
        }
        msg = msg.trim();
        if (msg === '') {
            return;
        }
        this.blockScroll = true
        this.sendMessage(msg)
    }

    sendMessage(message) {
        axiosRequest.post("/conversations/messages?id=" + this.state.currentId, new String(message))
            .then((resp) => {
                this.updateNewMessagesCount();
                this.setState({ message: '', messages: [...this.state.messages, resp.data] })
                this.setState({ resetInput: true }, () => {
                    this.setState({ resetInput: false })
                    this.scrollbars.current.scrollToBottom()
                })
            })
            .catch(() => {
                this.blockScroll = false
                this.context.setError(true)
                this.context.setMessage("Could not send message. Refresh the page and try again or contact site's administrator.")
            })
    }

    updateNewMessagesCount() {
        let newMsgsCount = this.state.newMessagesCount + 1;
        if (newMsgsCount === 20) {
            this.setState((prevState) => ({ currentPage: prevState.currentPage + 1, newMessagesCount: 0 }))
        }
        else {
            this.setState({ newMessagesCount: newMsgsCount })
        }
    }

    render() {
        const visible = this.state.buttonVisible;
        return (
            <React.Fragment>
                <div className="messageLoading">
                    <BeatLoader loading={this.state.loading} color={"#17BB0F"} />
                </div>
                <div className="chatBubblesContainer">
                    <Scrollbars autoHide className='customScrollbar' onScrollStop={this.onScrollStop} onUpdate={this.onUpdate} ref={this.scrollbars}>
                        <MessageBubbleContainer messages={this.state.messages} />
                    </Scrollbars>
                    <ScrollBottomIcon visible={visible} onClick={() => this.scrollbars.current.scrollToBottom()} />
                </div>
                <SendMessageBox onMessageSend={this.onMessageSend} reset={this.state.resetInput} />
            </React.Fragment>
        )
    }

}
ChatPanel.contextType = AppContext;