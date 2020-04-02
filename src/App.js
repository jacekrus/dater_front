import React, { Component } from 'react';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginView from './login/LoginView';

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
