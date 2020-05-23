import React, { Component } from 'react';
import AppContext from './AppContext';

class AppContextProvider extends Component {

    state = {
        user: 'Kazimierz'
    }

    render() {
        return (
            <AppContext.Provider value={{state: this.state}}>
                {this.props.children}
            </AppContext.Provider>
        )
    }

}

export default AppContextProvider;