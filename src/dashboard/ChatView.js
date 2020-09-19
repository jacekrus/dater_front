import React, { Component } from 'react';
import './MainLayoutStyles.css';
import SockJS from "sockjs-client"
import StandardInputBox from '../login/StandardInputBox';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Stomp from 'stompjs';
import qs from 'qs';


export default class ChatView extends Component {

    state = {
        sock: null,
        stomp: null,
        currentMsg: '',
        messages: ["hi", "hello", "okay"],
    }

    enableSock = () => {
        var sock = new SockJS('http://localhost:8080/chat');
        sock.onopen = function() {
            console.log('open');
            sock.send('test');
        };
        sock.onmessage = function(e) {
            console.log('message', e.data);
        };
        
        sock.onclose = function() {
            console.log('close');
        };
        let stomp;
        stomp = Stomp.over(sock);
        this.setState({sock: sock, stomp: stomp})
        stomp.connect({}, this.onConnected);
    }

    onConnected = () => {
        console.log("Stomp connection successful")
        this.state.stomp.subscribe('/topic/public', this.onMessageReceived)
    }

    sendMessage = () => {
        console.log("Sending message: " + this.state.currentMsg)
        this.state.stomp.send("/dater/chat.send", {}, JSON.stringify(this.state.currentMsg))
    }

    onMessageReceived = (msg) => {
        console.log("Holy fuck i received a message");
        let currentMessages = this.state.messages;
        this.setState({messages: [...currentMessages, JSON.parse(msg.body).text]})
    }

    render() {
        return (
            <div>
                <button onClick={this.enableSock}>start</button>
                {this.state.messages.map((each, index) => 
                    <div key={index}> {each} </div>
                )}
                <StandardInputBox icon={faUser} title="Enter message" placeholder="message" onInputChange={val => this.setState({ currentMsg: val })} maxLength={18}/>
                <button onClick={this.sendMessage}>Send message</button>
            </div>
        );
    }

}