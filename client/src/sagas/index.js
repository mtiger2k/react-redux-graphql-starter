import {take, call, put, fork, race} from 'redux-saga/effects'
import { login, me, register } from '../api/auth'
import { REQUEST_LOGIN, REQUEST_LOGOUT, SET_TOKEN, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../modules/auth'
import { REQUEST, SUCCESS } from '../modules/actionType'
import { FETCH_ME, CLEAR_USER } from '../modules/user'
import { push } from 'connected-react-router'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function * unAuth() {
    localStorage.removeItem('auth-token');
    yield put({type: SET_UNAUTHENTICATED});
    yield put({type: CLEAR_USER});
    yield put(push('/login'))
}

export function * fetchUser() {
  try {
	yield put({type: REQUEST(FETCH_ME)})
	let response = yield call(me)
    yield put({type: SUCCESS(FETCH_ME), payload: response})
    yield put({type: SET_AUTHENTICATED});
  } catch (error) {
  	yield call(unAuth)
  }
}

export function * authorize ({username, password}) {
  yield put(showLoading())

  try {
    let response = yield call(login, username, password)
    localStorage.setItem('auth-token', response.data.token)
    yield put({type: SET_TOKEN, payload: response})
    yield call(fetchUser)
    yield put(push('/dashboard'))
  } catch (error) {
  	yield call(unAuth)
  } finally {
    yield put(hideLoading())
  }
}

export function * loginFlow () {
  while (true) {
    const action = yield take(REQUEST_LOGIN)
    const {username, password} = action.payload
    yield call(authorize, {username, password})
  }
}

export function * fetchMeFlow () {
  while (true) {
    yield take(FETCH_ME)
    yield put(showLoading())
    yield call(fetchUser)
    yield put(hideLoading())
  }
}

export function * logoutFlow () {
  while (true) {
    yield take(REQUEST_LOGOUT)
    localStorage.removeItem('auth-token');
    yield put({type: 'RESET_REDUX'})
    yield put(push('/login'))
  }
}

export default function* rootSaga() {
  yield fork(loginFlow)
  yield fork(fetchMeFlow)
  yield fork(logoutFlow)
}
