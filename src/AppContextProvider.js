import React, { Component } from 'react';
import AppContext from './AppContext';

class AppContextProvider extends Component {

    state = {
        loggedIn: false,
        user: {},
        error: false,
        message: '',
    }

    render() {
        return (
            <AppContext.Provider value={{
                state: this.state,
                setLoggedIn: (bool) => this.setState({loggedIn: bool}),
                setUser: (userData) => this.setState({user: userData}),
                setError: (bool) => this.setState({error: bool}),
                setMessage: (msg) => this.setState({message: msg})
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }

}

export default AppContextProvider;