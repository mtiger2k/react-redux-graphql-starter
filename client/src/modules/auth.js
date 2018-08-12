import axios from 'axios'
import update from 'immutability-helper';
import { getCurrentUser, CLEAR_USER } from './user'
import { REQUEST, SUCCESS, FAILURE } from './actionType'

export const AUTH_USER = 'AUTH_USER'
export const UNAUTH_USER = 'UNAUTH_USER'
export const AUTH_ERROR = 'AUTH_ERROR'

export default function authReducer(state = {authenticated: false, token: null}, action) {
  switch (action.type) {
    case SUCCESS(AUTH_USER):
      return update(state, {error: {$set: ''}, authenticated: {$set: true}, token: {$set: action.payload.data.token}})
    case UNAUTH_USER:
      return update(state, {authenticated: {$set: false}, token: {$set: null}})
    case AUTH_ERROR:
      return update(state, {error: {$set: action.payload}})
    default:
      return state
  }
}

export const login = ({username, password}) => dispatch => 
  dispatch({
    type: AUTH_USER,
    payload: axios.post(`/signin`, {username, password})
  }).then(({value, action}) => {
    localStorage.setItem('auth-token', value.data.token)
    dispatch(getCurrentUser())
  })

export const register = ({username, password}) => dispatch => 
  dispatch({
    type: AUTH_USER,
    payload: axios.post(`/signup`, {username, password})
  }).then(({value, action}) => {
    localStorage.setItem('auth-token', value.data.token)
    dispatch(getCurrentUser());
    // TODO: init global variables
  })

export const signoutUser = () => dispatch => {
  localStorage.removeItem('auth-token');
  dispatch({type: 'USER_LOGOUT'});
  //dispatch({type: UNAUTH_USER})
  //dispatch({type: CLEAR_USER})
}

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
