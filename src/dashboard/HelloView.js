import React from 'react';
import AppContext from '../AppContext';

const HelloView = () => {
    return (
        <AppContext.Consumer>
            {(context) => (
                <div className="helloViewText">
                    Hello, {context.state.user.username}!<br />
                    Use menu on the left to navigate.
                </div>
            )}
        </AppContext.Consumer>
    )
}
export default HelloView;