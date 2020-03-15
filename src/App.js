import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UsersGrid from "./UsersGrid";
import LoginPanel from "./LoginPanel";

class App extends Component {

  showInfo() {
    console.log("Hello");
  }

  render() {
    return (
      <div>
        <LoginPanel />
      </div>
    );
  }
}

export default App;
