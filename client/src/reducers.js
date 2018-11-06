import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import history from './utils/history';
import appReducer from './modules'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {

  const rootReducer = combineReducers({
    ...appReducer,
    ...injectedReducers,
    form: formReducer,
    router: connectRouter(history),
    loadingBar,
  });

  const appReducer2 = (state, action) => {
    if (action.type === 'RESET_REDUX') {
      const { router } = state
      state = { router } 
    }
    return rootReducer(state, action)
  }

  return appReducer2;
}
