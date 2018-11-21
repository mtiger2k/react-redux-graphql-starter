import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ApolloProvider } from 'react-apollo';
import configureStore from './configureStore'
import configureClient from './client'
import history from './utils/history';
import { getCurrentUser } from './modules/user'

import Logout from './views/Pages/Logout/Logout'

import './App.scss';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import 'react-toastify/dist/ReactToastify.css';

import LoadingPage from './components/Loading'
import loadable from '@loadable/component'

function Loading() {
  return <LoadingPage>正在载入页面...</LoadingPage>;
}

const DefaultLayout = loadable(() => import('./layout/DefaultLayout'), {
   fallback: Loading,
});

const Login = loadable(() => import('./views/Pages/Login/Login'), {
   fallback: Loading,
});

const Register = loadable(() => import('./views/Pages/Register/Register'), {
   fallback: Loading,
});

const Page404 = loadable(() => import('./views/Pages/Page404/Page404'), {
   fallback: Loading,
});

const Page500 = loadable(() => import('./views/Pages/Page500/Page500'), {
   fallback: Loading,
});

// initiate state
let initialState = {};
const store = configureStore(initialState, history);

// Create an http link:
const client = configureClient();

class App extends Component {

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
