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
          <Router>
            {context.state.loggedIn ?  <Redirect to='/dashboard' /> : <Redirect to='/' />}
            <Route exact path="/" component={LoginView} />
            <Route exact path="/dashboard" component={MainLayout} />
          </Router>
        )}
      </AppContext.Consumer>
    );
  }
}

export default App;
