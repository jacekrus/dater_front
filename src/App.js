import React, { Component } from 'react';
import LoginView from './login/LoginView';
import MainLayout from './dashboard/MainLayout';

class App extends Component {

  render() {
    return (
      <div className="mainLayout">
        <MainLayout />
      </div>
    );
  }
}

export default App;
