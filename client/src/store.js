import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'
import appReducer from './modules'
import { setupAxiosInterceptors } from './middlewares/axiosInterceptors';
import notificationMiddleware from './middlewares/notification-middleware';
import { UNAUTH_USER, AUTH_ERROR } from './modules/auth'
import { getCurrentUser } from './modules/user'

export const history = createHistory()

export default (initialState) => {

  const enhancers = []
  const middleware = [thunk, notificationMiddleware, promiseMiddleware(), loadingBarMiddleware(), routerMiddleware(history)]

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }

    middleware.push(createLogger())
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  )

  let token = localStorage.getItem('auth-token');
  if (token) {
    initialState = {
      auth: {authenticated: false, token: token},
    };
  }

  const appReducer2 = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      const { routing } = state
      state = { routing } 
    }
    return appReducer(state, action)
  }

  const rootReducer = connectRouter(history)(appReducer2);

  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
  )

  const logoutCallback = (authError)=> {
    store.dispatch({ type: AUTH_ERROR, payload: authError });
    store.dispatch({type: 'USER_LOGOUT'});
    localStorage.removeItem('auth-token');
    history.push('login');
  }

  setupAxiosInterceptors(logoutCallback, store);

  if (token) {
    // get user info if the token exists
    store.dispatch(getCurrentUser());
  } else {
    history.push('login');
  }

  return store;

}
