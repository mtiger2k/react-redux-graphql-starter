import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ApolloProvider } from 'react-apollo';
import configureStore, { history } from './store'
import configureClient from './client'

import { me } from './modules/user'

import Logout from './views/Pages/Login/Logout'

// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'
//import './App.css';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

// Containers
import { DefaultLayout } from './layout';
// Pages
import { Login, Page404, Page500, Register } from './views/Pages';

// initiate state
let initialState = {};
const store = configureStore(initialState);

// Create an http link:
const client = configureClient();

class App extends Component {

  componentDidMount() {
    let token = localStorage.getItem('auth-token');
    if (token) {
      // get user info if the token exists
      store.dispatch(me());
    }
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
        <ApolloProvider client={client}>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/logout" name="Logout Page" component={Logout} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </ApolloProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
