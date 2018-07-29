import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import counter from './counter'
import auth from './auth'
import user from './user'

export default combineReducers({
  counter, auth, user, 
  form: formReducer,
  loadingBar
})
