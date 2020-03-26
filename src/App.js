import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UsersGrid from "./UsersGrid";
import LoginPanel from "./LoginPanel";
import LoginView from "./login/LoginView";

class App extends Component {

  render() {
    return (
      <div>
        <LoginView />
      </div>
    );
  }
}

export default App;
