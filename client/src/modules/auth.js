import axios from 'axios'
import update from 'immutability-helper';
import { me, CLEAR_USER } from './user'

export const AUTH_USER = 'auth_user'
export const UNAUTH_USER = 'unauth_user'
export const AUTH_ERROR = 'auth_error'

export default function authReducer(state = {authenticated: false, token: null, user: {}}, action) {
  switch (action.type) {
    case AUTH_USER:
      return update(state, {error: {$set: ''}, authenticated: {$set: true}, token: {$set: action.payload.token}, user: {$set: action.payload.user}})
    case UNAUTH_USER:
      return update(state, {authenticated: {$set: false}, token: {$set: null}, user: {$set: {}}})
    case AUTH_ERROR:
      return update(state, {error: {$set: action.payload}})
    default:
      return state
  }
}

export function signinUser({username, password}) {

  return function (dispatch) {

    // submit username and password to server
    const request = axios.post(`/signin`, {username, password})
    request
      .then(response => {
        // -Save the JWT token
        localStorage.setItem('auth-token', response.data.token)

        // -if request is good, we need to update state to indicate user is authenticated
        dispatch({type: AUTH_USER, payload: response.data})
        dispatch(me())
      })
  }
}

export function signoutUser() {
  localStorage.removeItem('auth-token')
  return function(dispatch) {
    dispatch(
      {type: UNAUTH_USER}
    )
    dispatch({type: CLEAR_USER})
  }
}

export function signupUser({username, password, dispName, mobileNo}) {
  return function (dispatch) {
    axios.post(`/signup`, {username, password, dispName, mobileNo})
      .then(response => {
        dispatch({type: AUTH_USER, payload: response.data})
        localStorage.setItem('auth-token', response.data.token)
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
