import React, { Component } from 'react';
import AppContext from './AppContext';

class AppContextProvider extends Component {

    state = {
        loggedIn: false,
        user: 'Kazik',
    }

    render() {
        return (
            <AppContext.Provider value={{
                state: this.state,
                setLoggedIn: (value) => this.setState({loggedIn: value})
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }

}

export default AppContextProvider;