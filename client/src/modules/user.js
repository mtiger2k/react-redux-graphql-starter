import { REQUEST, SUCCESS } from './actionType'
import update from 'immutability-helper';

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

export const getCurrentUser = () => {
  return {type: FETCH_ME}
}
