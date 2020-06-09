import React, { Component } from 'react';
import AppContext from './AppContext';

class AppContextProvider extends Component {

    state = {
        loggedIn: localStorage.getItem('sessionAlive') === 'true',
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