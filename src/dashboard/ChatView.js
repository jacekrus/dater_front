import React, { Component } from 'react';
import './MainLayoutStyles.css';
import { BeatLoader } from 'react-spinners';
import axiosRequest from '../AxiosRequest';
import SockJS from "sockjs-client"
import StandardInputBox from '../login/StandardInputBox';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Stomp from 'stompjs';
import qs from 'qs';
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
                    <ConversationsContainer onConversationClicked={this.onConversationClicked} conversationId={this.state.conversationId}/>
                    <MessagesContainer onMenuItemClicked={this.props.onMenuItemClicked} conversationId={this.state.conversationId}/>
                </div>
            </React.Fragment>
        );
    }

    // state = {
    //     sock: null,
    //     stomp: null,
    //     currentMsg: '',
    //     messages: ["hi", "hello", "okay"],
    // }

    // enableSock = () => {
    //     var sock = new SockJS('http://localhost:8080/chat');
    //     sock.onopen = function() {
    //         console.log('open');
    //         sock.send('test');
    //     };
    //     sock.onmessage = function(e) {
    //         console.log('message', e.data);
    //     };

    //     sock.onclose = function() {
    //         console.log('close');
    //     };
    //     let stomp;
    //     stomp = Stomp.over(sock);
    //     this.setState({sock: sock, stomp: stomp})
    //     stomp.connect({}, this.onConnected);
    //     stomp.send()
    // }

    // onConnected = () => {
    //     console.log("Stomp connection successful")
    //     this.state.stomp.subscribe('/topic/public', this.onMessageReceived)
    // }

    // sendMessage = () => {
    //     console.log("Sending message: " + this.state.currentMsg)
    //     this.state.stomp.send("/dater/chat.send", {}, JSON.stringify(this.state.currentMsg))
    // }

    // onMessageReceived = (msg) => {
    //     console.log("Holy fuck i received a message");
    //     let currentMessages = this.state.messages;
    //     try {

    //     }
    //     catch(e) {

    //     }
    //     this.setState({messages: [...currentMessages, JSON.parse(msg.body).text]})
    // }

    // render() {
    //     return (
    //         <div>
    //             <button onClick={this.enableSock}>start</button>
    //             {this.state.messages.map((each, index) => 
    //                 <div key={index}> {each} </div>
    //             )}
    //             <StandardInputBox icon={faUser} title="Enter message" placeholder="message" onInputChange={val => this.setState({ currentMsg: val })} maxLength={18}/>
    //             <button onClick={this.sendMessage}>Send message</button>
    //         </div>
    //     );
    // }

}