import axios from 'axios'

export const FETCH_ME = 'fetch_me'
export const UPDATE_ME = 'update_me'
export const CLEAR_USER = 'clear_user'
export const CLEAR_MSG = 'clear_msg'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'

export default function userReducer(state = {user: null, loading: true, successMsg: null, errorMsg: null}, action) {
  switch (action.type) {
    case FETCH_ME:
      return Object.assign({}, {user: action.payload, loading: false})
    case UPDATE_ME:
      return Object.assign({}, {user: {...state.user, ...action.payload}, successMsg: '修改成功！'})
    case CHANGE_PASSWORD:
      if (action.payload.error)
        return Object.assign({}, {user: {...state.user}, errorMsg: action.payload.error})
      else
        return Object.assign({}, {user: {...state.user}, successMsg: '修改成功！'})
    case CLEAR_USER:
      return Object.assign({}, {user: null, loading: false})
    case CLEAR_MSG:
      return {...state, successMsg: null, errorMsg: null}
    default:
      return state
  }
}

export function me() {
  return function (dispatch) {
    axios.get('/me')
      .then(response => {
        dispatch({
          type: FETCH_ME,
          payload: response.data
        })
      })
  }
}

export function update(user) {
  return function(dispatch) {
    axios.post('/update', {user})
    .then(response => {
      dispatch({
        type: UPDATE_ME,
        payload: user
      })
    })
  }
}

export function changePassword(oldPassword, newPassword) {
  return function(dispatch) {
    axios.post('/changePassword', {oldPassword, newPassword})
    .then(response => {
      dispatch({
        type: CHANGE_PASSWORD,
        payload: response.data
      })
    })
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