import React, { Component } from 'react';
import StandardInputBox from '../login/StandardInputBox';
import { faCommentDots, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SendMessageBox extends Component {

    state = {
        message: ''
    }

    onMessageSend = (e) => {
        this.props.onMessageSend(e, this.state.message);
    }

    render() {
        return (
            <div className="chatMsgBoxContainer">
                <div className="messageBox">
                    <form onSubmit={(e) => this.onMessageSend(e)}>
                        <StandardInputBox icon={faCommentDots} placeholder="Type a message..." maxLength={499}
                            onInputChange={val => this.setState({ message: val })} reset={this.props.reset} />
                    </form>
                </div>
                <div>
                    <FontAwesomeIcon icon={faPaperPlane} className="sendMsgIcon" title={"Send"} onClick={this.onMessageSend} />
                </div>
            </div>
        )
    }

}