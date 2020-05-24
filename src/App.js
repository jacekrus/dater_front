import React, { Component } from 'react';
import LoginView from './login/LoginView';
import MainLayout from './dashboard/MainLayout';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import AppContext from './AppContext';

class App extends Component {

  render() {
    return (
      <AppContext.Consumer>
        {(context) => (
            context.state.loggedIn ?  <MainLayout /> : <LoginView />
        )}
      </AppContext.Consumer>
    );
  }
}

export default App;
