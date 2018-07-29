import axios from 'axios'
import { REQUEST, SUCCESS, FAILURE } from './actionType'
import update from 'immutability-helper';

export const FETCH_ME = 'FETCH_ME'
export const UPDATE_ME = 'UPDATE_ME'
export const CLEAR_USER = 'CLEAR_USER'
export const CLEAR_MSG = 'CLEAR_MSG'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'

export default function userReducer(state = {user: null, loading: true, successMsg: null, errorMsg: null}, action) {
  switch (action.type) {
    case SUCCESS(FETCH_ME):
      return update(state, {user: {$set: action.payload.data}, loading: {$set: false}});
    case SUCCESS(UPDATE_ME):
      return update(state, {user: {$set: action.payload.data}, successMsg: {$set: '修改成功！'}});
    case SUCCESS(CHANGE_PASSWORD):
      if (action.payload.data.error)
        return update(state, {errorMsg: {$set: action.payload.data.error}});
      else
        return update(state, {successMsg: {$set: '修改成功！'}});
    case CLEAR_USER:
      return update(state, {user: {$set: null}, loading: {$set: false}});
    case CLEAR_MSG:
      return update(state, {errorMsg: {$set: null}, successMsg: {$set: null}});
    default:
      return state
  }
}

export const getCurrentUser = () => {
  return {
    type: FETCH_ME,
    payload: axios.get('/me')
  }
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

export function clearMsg() {
  return {
    type: CLEAR_MSG
  }
}