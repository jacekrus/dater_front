import React, { Component } from 'react';
import LoginView from './login/LoginView';
import MainLayout from './dashboard/MainLayout';
import AppContext from './AppContext';
import AppContextProvider from './AppContextProvider';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
       user: 'Kaziu',
    }
  }
  
  render() {
    let ctx = this.context;
    return (
      <AppContextProvider>
        <div>
          <MainLayout />
        </div>
      </AppContextProvider>
    );
  }
}

export default App;
