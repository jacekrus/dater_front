import React, { Component } from 'react';
import './MainLayoutStyles.css';
import axiosRequest from '../AxiosRequest';
import AppContext from '../AppContext';
import MessageBubble from './MessageBubble';
import { Scrollbars } from 'react-custom-scrollbars';
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BeatLoader } from 'react-spinners';
import SendMessageBox from './SendMessageBox';
import MessageBubbleContainer from './MessageBubbleContainer';

export default class ChatPanel extends Component {

    scrollbars = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            currentId: this.props.conversationId,
            scrollTop: 0,
            scrollHeight: 0,
            currentPage: 0,
            blockScroll: false,
            loading: true,
            resetInput: false,
            newMessagesCount: 0,
            newMessage: this.props.newMessage,
        }
    }

    componentDidMount() {
        this.requestMessages();
    }

    componentDidUpdate() {
        if (this.state.currentId !== this.props.conversationId) {
            this.setState({ messages: [], currentId: this.props.conversationId, currentPage: 0, scrollTop: 0, scrollHeight: 0, newMessagesCount: 0 }, () => this.requestMessages());
        }
        if(this.props.newMessage !== null && (this.state.newMessage === null || this.props.newMessage.id !== this.state.newMessage.id)) {
            if(this.props.newMessage.conversation.id === this.state.currentId) {
                this.setState({newMessage: this.props.newMessage}, () => this.onMessageReceived(this.props.newMessage))
            }
        }
    }

    onMessageReceived = (msg) => {
        this.updateNewMessagesCount();
        this.setState({ messages: [...this.state.messages, msg], blockScroll: true}, () => this.scrollbars.current.scrollToBottom())
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
            this.scrollbars.current.scrollTop(scrollHeight);
        }
    }

    onUpdate = (values) => {
        const { scrollTop, scrollHeight } = values;
        if (scrollTop < this.state.scrollTop && scrollTop < 1) {
            this.setState({ loading: true })
            this.requestMessages();
        }
        if (scrollHeight > this.state.scrollHeight) {
            if (this.state.blockScroll) {
                this.setState({ blockScroll: false });
            }
            else {
                this.adjustScrollPosition(scrollHeight - this.state.scrollHeight)
            }
            this.setState({ scrollHeight: scrollHeight });
        }
        if (scrollTop !== this.state.scrollTop) {
            this.setState({ scrollTop: scrollTop });
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
        this.setState({ blockScroll: true }, () => this.sendMessage(msg))
    }

    sendMessage(message) {
        axiosRequest.post("/conversations/messages?id=" + this.state.currentId, new String(message))
            .then((resp) => {
                this.updateNewMessagesCount();
                this.setState({ message: '', messages: [...this.state.messages, resp.data] })
                this.scrollbars.current.scrollToBottom();
                this.setState({ resetInput: true }, () => this.setState({ resetInput: false }))
            })
            .catch(() => {
                this.setState({ blockScroll: false })
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
        let clientHeight = 630;
        const buttonVisible = this.state.scrollHeight - (this.state.scrollTop + clientHeight) > 500;
        return (
            <React.Fragment>
                <div className="messageLoading">
                    <BeatLoader loading={this.state.loading} color={"#17BB0F"} />
                </div>
                <div className="chatBubblesContainer">
                    <Scrollbars autoHide className='customScrollbar' onUpdate={this.onUpdate} ref={this.scrollbars}>
                        <MessageBubbleContainer messages={this.state.messages} />
                    </Scrollbars>
                    <div className="scrollBottomIconContainer">
                        <FontAwesomeIcon icon={faArrowCircleDown} className={"sendMsgIcon scrollBottomIcon" + (buttonVisible ? " scrollBottomIconVisible" : "")}
                            title={"Scroll bottom"} onClick={() => this.scrollbars.current.scrollToBottom()} />
                    </div>
                </div>
                <SendMessageBox onMessageSend={this.onMessageSend} reset={this.state.resetInput} />
            </React.Fragment>
        )
    }

}
ChatPanel.contextType = AppContext;