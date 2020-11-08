import React, { Component } from 'react';
import './MainLayoutStyles.css';
import axiosRequest from '../AxiosRequest';
import AppContext from '../AppContext';
import MessageBubble from './MessageBubble';
import { Scrollbars } from 'react-custom-scrollbars';
import StandardInputBox from '../login/StandardInputBox';
import { faCommentDots, faPaperPlane, faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BeatLoader } from 'react-spinners';

export default class ChatPanel extends Component {

    scrollbars = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            currentId: this.props.conversationId,
            message: '',
            scrollTop: 0,
            currentPage: 0,
            loading: true,
        }
    }

    componentDidMount() {
        this.requestMessages();
    }

    componentDidUpdate() {
        if (this.state.currentId !== this.props.conversationId) {
            this.setState({ messages: [], currentId: this.props.conversationId, currentPage: 0, scrollTop: 0 }, () => this.requestMessages());
        }
    }

    requestMessages() {
        axiosRequest.get('/conversations/messages?id=' + this.props.conversationId + '&page=' + this.state.currentPage + '&size=20')
            .then((resp) => {
                let msgs = resp.data.map((val, idx, arr) => arr[arr.length - 1 - idx]);
                this.setState((prevState) => ({ messages: [...msgs, ...this.state.messages], currentPage: prevState.currentPage + 1 }), () => this.scrollBottomOnFirstLoad());
                this.setState({ loading: false })
            })
            .catch(() => this.handleError());
    }

    handleError = () => {
        this.context.setError(true)
        this.context.setMessage("Unable to load more messages. Please try again later or contact site's administrator.")
        this.setState({ loading: false })
    }

    scrollBottomOnFirstLoad = () => {
        if (this.state.currentPage === 1) {
            this.scrollbars.current.scrollToBottom()
        }
    }

    onUpdate = (values) => {
        const { scrollTop } = values;
        if (scrollTop < this.state.scrollTop && scrollTop < 1) {
            this.setState({ loading: true })
            this.requestMessages();
        }
        if (scrollTop !== this.state.scrollTop) {
            this.setState({ scrollTop: scrollTop });
        }
    }

    onMessageSend = (e) => {
        if (e) {
            e.preventDefault();
        }
        let msg = this.state.message.trim();
        if (msg === '') {
            return;
        }
        axiosRequest.post("/conversations/messages?id=" + this.state.currentId, new String(msg))
            .then((resp) => {
                this.setState({ message: '', messages: [...this.state.messages, resp.data] })
                this.scrollbars.current.scrollToBottom();
            })
            .catch(() => {
                this.context.setError(true)
                this.context.setMessage("Could not send message")
            })
    }

    render() {
        const buttonVisible = this.state.scrollTop < 360 && this.state.messages.length > 25;
        return (
            <React.Fragment>
                <div className="messageLoading">
                    <BeatLoader loading={this.state.loading} color={"#17BB0F"} />
                </div>
                <div className="chatBubblesContainer">
                    <Scrollbars autoHide className='customScrollbar' onUpdate={this.onUpdate} ref={this.scrollbars}>
                        {this.state.messages.map((each, index) =>
                            <React.Fragment key={index}>
                                <MessageBubble text={each.text}
                                    mine={each.sender.id === this.context.state.user.id}
                                    date={each.sendTime}
                                    photo={each.sender.photos[0]} />
                            </React.Fragment>
                        )}
                    </Scrollbars>
                    <div className="scrollBottomIconContainer">
                        <FontAwesomeIcon icon={faArrowCircleDown} className={"sendMsgIcon scrollBottomIcon" + (buttonVisible ? " scrollBottomIconVisible" : "")}
                            title={"Scroll bottom"} onClick={() => this.scrollbars.current.scrollToBottom()} />
                    </div>
                </div>
                <div className="chatMsgBoxContainer">
                    <div className="messageBox">
                        <form onSubmit={(e) => this.onMessageSend(e)} >
                            <StandardInputBox icon={faCommentDots} placeholder="Type a message..." maxLength={499}
                                onInputChange={val => this.setState({ message: val })} />
                        </form>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faPaperPlane} className="sendMsgIcon" title={"Send"} onClick={this.onMessageSend} />
                    </div>
                </div>
            </React.Fragment>
        )
    }

}
ChatPanel.contextType = AppContext;