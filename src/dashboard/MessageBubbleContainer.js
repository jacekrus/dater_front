import React from 'react';
import MessageBubble from './MessageBubble';
import AppContext from '../AppContext';

const MessageBubbleContainer = ({ messages }) => {
    return (
        <AppContext.Consumer>
            {(context) => (
                <React.Fragment>
                    {messages.map((each, index) =>
                        <React.Fragment key={index}>
                            <MessageBubble text={each.text}
                                mine={each.sender.id === context.state.user.id}
                                date={each.sendTime}
                                username={each.sender.username}
                                photo={each.sender.photos[0]} />
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
        </AppContext.Consumer>
    )
}
export default MessageBubbleContainer;