import React, { Component, useContext } from 'react';
import LoginView from './login/LoginView';
import MainLayout from './dashboard/MainLayout';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AppContext from './AppContext';
import axiosRequest from './AxiosRequest';
import Alert from './Alert';
import Views from './dashboard/Views';

class App extends Component {

  componentDidMount() {
    const appContext = this.context;
    axiosRequest.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (error && error.response.status === 401) {
        if (appContext.state.loggedIn === true) {
          appContext.setLoggedIn(false);
          appContext.setUser({});
        }
      }
      return Promise.reject(error);
    })
    axiosRequest.get('/users/me')
      .then((resp) => {
        appContext.setUser(resp.data);
        appContext.setLoggedIn(true);
      })
      .catch(() => {
        //do nothing
      })
  }

  render() {
    return (
      <AppContext.Consumer>
        {(context) => (
          <Switch>
            <Route exact path='/' render={() => context.state.loggedIn ? <Redirect to={Views.DASHBOARD.path} /> : <Redirect to={Views.LOGIN.path} />} />
            <Route path={Views.LOGIN.path} render={() => !context.state.loggedIn ? <LoginView /> : <Redirect to={Views.DASHBOARD.path} />} />
            <Route path={Views.DASHBOARD.path} render={() => context.state.loggedIn ? <MainLayout /> : <Redirect to={Views.LOGIN.path} />} />
          </Switch>
        )}
      </AppContext.Consumer>
    );
  }

}
App.contextType = AppContext;

export default App;
