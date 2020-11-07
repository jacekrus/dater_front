import React from 'react';
import './MainLayoutStyles.css';

const MessageBubble = ({ text, mine, date, photo }) => {

    return (
        <React.Fragment>
            {mine ?
                <div className="displayFlex">
                    <div className="messageBubble messageBubbleMine" title={date}>{text}</div>
                </div>
                : <div className="displayFlex">
                    <div className="msgBubbleImgContainer">
                        <img className="msgBubbleImg" alt="usr" src={photo}></img>
                    </div>
                    <div className="messageBubble" title={date}>{text}</div>
                </div>
                }
        </React.Fragment>
    );

}
export default MessageBubble;