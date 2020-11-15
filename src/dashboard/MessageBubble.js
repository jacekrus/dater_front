import React from 'react';
import './MainLayoutStyles.css';

const MessageBubble = ({ text, mine, date, username, photo }) => {

    return (
        <React.Fragment>
            {mine ?
                <div className="displayFlex">
                    <div className="messageBubble messageBubbleMine" title={new Date(date).toLocaleDateString("en-US") + ", " + new Date(date).toLocaleTimeString("en-US")}>{text}</div>
                </div>
                : <div className="displayFlex">
                    <div className="msgBubbleImgContainer">
                        <img className="msgBubbleImg" alt="usr" src={photo}></img>
                    </div>
                    <div className="messageBubble" title={username + " on: " + new Date(date).toLocaleDateString("en-US") + ", " + new Date(date).toLocaleTimeString("en-US")}>{text}</div>
                </div>
                }
        </React.Fragment>
    );

}
export default MessageBubble;