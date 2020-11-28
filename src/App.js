import React, { Component } from 'react';
import LoginView from './login/LoginView';
import MainLayout from './dashboard/MainLayout';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppContext from './AppContext';
import axiosRequest from './AxiosRequest';
import ToastMessage from './ToastMessage';
import Views from './dashboard/Views';
import NoMatch from './NoMatch';
import Footer from './login/Footer';
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {

  state = {
    displayedMsg: '',
  }

  componentDidMount() {
    axiosRequest.interceptors.response.use((response) => {
      this.context.setError(false)
      return response;
    }, (error) => {
      this.context.setError(true);
      if (error && error.response && error.response.status === 401) {
        if (this.context.state.loggedIn === true) {
          this.context.setLoggedIn(false);
          this.context.setUser({});
          this.context.setMessage("Your session has expired, please log in again")
        }
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

  componentDidUpdate() {
    let newMsg = this.context.state.message;
    if (newMsg !== '' && newMsg !== this.state.displayedMsg) {
      this.setState({ displayedMsg: newMsg }, this.showToast)
    }
  }

  showToast = () => {
    if (this.context.state.error) {
      this.showError();
    }
    else {
      this.showInfo();
    }
  }

  onToastClose = () => {
    if (this.context.state.message !== '') {
      this.context.setMessage('');
      this.context.setError(false);
    }
    if (this.state.displayedMsg !== '') {
      this.setState({ displayedMsg: '' })
    }
  }

  showInfo = () => {
    toast.success(<ToastMessage message={this.state.displayedMsg} />, {
      onClose: this.onToastClose
    });
  }

  showError = () => {
    toast.error(<ToastMessage message={this.state.displayedMsg} error />, {
      onClose: this.onToastClose,
    });
  }

  render() {
    return (
      <AppContext.Consumer>
        {(context) => (
          <div className={context.state.loggedIn ? 'appLayout' : ''}>
            <Switch>
              <Route exact path='/' render={() => context.state.loggedIn ? <Redirect to={Views.DASHBOARD.path} /> : <Redirect to={Views.LOGIN.path} />} />
              <Route path={Views.LOGIN.path} render={() => !context.state.loggedIn ? <LoginView /> : <Redirect to={Views.DASHBOARD.path} />} />
              <Route path={Views.DASHBOARD.path} render={() => context.state.loggedIn ? <MainLayout /> : <Redirect to={Views.LOGIN.path} />} />
              <Route path='*' component={NoMatch} />
            </Switch>
            <Footer />
            <ToastContainer position="bottom-center" draggable={false} limit={2} autoClose={3500} transition={Slide} pauseOnFocusLoss={false} />
          </div>
        )}
      </AppContext.Consumer>
    );
  }

}
App.contextType = AppContext;

export default App;
