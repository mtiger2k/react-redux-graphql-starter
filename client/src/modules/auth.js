import update from 'immutability-helper';

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT'

export const SET_TOKEN = 'SET_TOKEN'
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED'
export const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED'

export default function authReducer(state = {authenticated: false, token: null}, action) {
  switch (action.type) {
    case SET_TOKEN:
      return update(state, {token: {$set: action.payload.data.token}})
    case SET_AUTHENTICATED:
      return update(state, {authenticated: {$set: true}})
    case SET_UNAUTHENTICATED:
      return update(state, {authenticated: {$set: false}, token: {$set: null}})
    default:
      return state
  }
}

export const logout = () => {
  return ({type: REQUEST_LOGOUT});
}
