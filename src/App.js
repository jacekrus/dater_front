import React, { Component } from 'react';
import LoginView from './login/LoginView';
import MainLayout from './dashboard/MainLayout';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppContext from './AppContext';
import axiosRequest from './AxiosRequest';
import Alert from './Alert';
import Views from './dashboard/Views';
import NoMatch from './NoMatch';

class App extends Component {

  componentDidMount() {
    axiosRequest.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (error && error.response.status === 401) {
        if (this.context.state.loggedIn === true) {
          this.context.setLoggedIn(false);
          this.context.setUser({});
          this.context.setMessage("Your session has expired, please log in again")
        }
      }
      else if(error && error.response.status > 400) {
        this.context.setMessage("Something went wrong, please try again later")
        this.context.setError(true);
      }
      return Promise.reject(error);
    })
    axiosRequest.get('/users/me')
      .then((resp) => {
        this.context.setUser(resp.data);
        this.context.setLoggedIn(true);
      })
      .catch(() => {
        //do nothing
      })
  }

  render() {
    return (
      <AppContext.Consumer>
        {(context) => (
          <React.Fragment>
            <Switch>
              <Route exact path='/' render={() => context.state.loggedIn ? <Redirect to={Views.DASHBOARD.path} /> : <Redirect to={Views.LOGIN.path} />} />
              <Route path={Views.LOGIN.path} render={() => !context.state.loggedIn ? <LoginView /> : <Redirect to={Views.DASHBOARD.path} />} />
              <Route path={Views.DASHBOARD.path} render={() => context.state.loggedIn ? <MainLayout /> : <Redirect to={Views.LOGIN.path} />} />
              <Route path='*' component={NoMatch} />
            </Switch>
            <Alert />
          </React.Fragment>
        )}
      </AppContext.Consumer>
    );
  }

}
App.contextType = AppContext;

export default App;
