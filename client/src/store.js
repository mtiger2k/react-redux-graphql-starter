import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import promiseMiddleware from 'redux-promise-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'
import appReducer from './modules'
import { setupAxiosInterceptors } from './middlewares/axiosInterceptors';
import notificationMiddleware from './middlewares/notification-middleware';
import { getCurrentUser } from './modules/user'
import rootSaga from './sagas'

export const history = createHistory()

export default (initialState) => {

  const enhancers = []
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [thunk, sagaMiddleware, notificationMiddleware, promiseMiddleware(), loadingBarMiddleware(), routerMiddleware(history)]

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
    if (action.type === 'RESET_REDUX') {
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

  sagaMiddleware.run(rootSaga)

  setupAxiosInterceptors(store);

  if (token) {
    // get user info if the token exists
    store.dispatch(getCurrentUser());
  } else {
    history.push('login');
  }

  return store;

}
