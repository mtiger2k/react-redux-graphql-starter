import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import promiseMiddleware from 'redux-promise-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { createLogger } from 'redux-logger'
import { setupAxiosInterceptors } from './middlewares/axiosInterceptors';
import { getCurrentUser } from './modules/user'
import createReducer from './reducers';
import getInjectors from './utils/sagaInjectors';
import {fetchMeFlow} from './sagas'
import { fork } from 'redux-saga/effects'

function* fetchMeSaga() {
  yield fork(fetchMeFlow)
}

export default (initialState, history) => {

  const enhancers = []
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [thunk, sagaMiddleware, promiseMiddleware(), loadingBarMiddleware(), routerMiddleware(history)]

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

  const store = createStore(
    createReducer(),
    initialState,
    composedEnhancers
  )

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  const { injectSaga } = getInjectors(store);
  injectSaga('fetchMe', { saga: fetchMeSaga });

  setupAxiosInterceptors(store);

  if (token) {
    // get user info if the token exists
    store.dispatch(getCurrentUser());
  } else {
    history.push('/login');
  }

  return store;

}
