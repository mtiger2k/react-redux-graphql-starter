import axios from 'axios'
import { REQUEST, SUCCESS, FAILURE } from './actionType'
import update from 'immutability-helper';
import { authenticated, clearAuthToken } from './auth'
import { push } from 'connected-react-router'

export const FETCH_ME = 'FETCH_ME'
export const UPDATE_ME = 'UPDATE_ME'
export const CLEAR_USER = 'CLEAR_USER'
export const CLEAR_MSG = 'CLEAR_MSG'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'

export default function userReducer(state = {user: null, loading: false}, action) {
  switch (action.type) {
    case REQUEST(FETCH_ME):
      return update(state, {loading: {$set: true}});
    case SUCCESS(FETCH_ME):
      return update(state, {user: {$set: action.payload.data}, loading: {$set: false}});
    case SUCCESS(UPDATE_ME):
      return update(state, {user: {$set: action.payload.data}});
    case SUCCESS(CHANGE_PASSWORD):
      return state
    case CLEAR_USER:
      return update(state, {user: {$set: null}, loading: {$set: false}});
    default:
      return state
  }
}

export const getCurrentUser = () => dispatch => {
  dispatch({
    type: FETCH_ME,
    payload: axios.get('/me'),
    /*meta: {
      successMessage: '已成功载入登录信息！'
    }*/
  }).then(({value, action}) => {
    let user = value.data;
    if (!user) {
      clearAuthToken();
      dispatch(push('login'));
      return;
    }
    dispatch(authenticated());
    // TODO: init global variables   
  }).catch((error) => {
    dispatch(push('login'));
  })
}

export const updateUser = (user) => {
  return {
    type: UPDATE_ME,
    payload: axios.post('/update', {user})
  }
}

export const changePassword = (oldPassword, newPassword) => {
  return {
    type: CHANGE_PASSWORD,
    payload: axios.post('/changePassword', {oldPassword, newPassword})
  }
}

export function clearUser() {
  return {
    type: CLEAR_USER
  }
}
