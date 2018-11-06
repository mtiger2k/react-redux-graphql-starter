import {take, takeLatest, call, put, fork, race} from 'redux-saga/effects'
import { REQUEST, SUCCESS } from '../modules/actionType'
import { login, me, register } from '../api/auth'
import { REQUEST_LOGIN, REQUEST_LOGOUT, SET_TOKEN, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../modules/auth'
import { FETCH_ME, CLEAR_USER } from '../modules/user'
import { push } from 'connected-react-router'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function * unAuth() {
    localStorage.removeItem('auth-token');
    yield put({type: SET_UNAUTHENTICATED});
    yield put({type: CLEAR_USER});
}

export function * fetchUser(isLogin) {
  try {
	  yield put(showLoading())
	  yield put({type: REQUEST(FETCH_ME)})
	  let response = yield call(me)
    if (!response.data || response.status == 401 || response.status == 403) throw 'token error';
    yield put({type: SUCCESS(FETCH_ME), payload: response})
    yield put({type: SET_AUTHENTICATED});
  } catch (error) {
    if (isLogin) {
      throw error
    } else {
      yield call(unAuth)
      yield put(push('/login'))
    }
  } finally {
  	yield put(hideLoading())
  }
}

export function * authorize ({username, password, resolve, reject}) {
  yield put(showLoading())

  try {
    let response = yield call(login, username, password)
    localStorage.setItem('auth-token', response.data.token)
    yield put({type: SET_TOKEN, payload: response})
    yield call(fetchUser, true)
    yield call(resolve);
    //yield put(push('/dashboard'))
  } catch (error) {
  	yield call(unAuth)
    if (!error.response) {
  	  yield call(reject, {_error: 'network error!'});
    } else {
      if (error.response.status == 403 || error.response.status == 401) {
        yield call(reject, {_error: 'bad login!'});
      }
    }
  } finally {
    yield put(hideLoading())
  }
}

export function * loginFlow () {
  /*while (true) {
    const action = yield take(REQUEST_LOGIN)
    const {username, password} = action.payload
    yield call(authorize, {username, password})
  }*/
  yield takeLatest(REQUEST_LOGIN, authorize)
}

export function * fetchMeFlow () {
  yield take(FETCH_ME)
  yield call(fetchUser)
}

export function * logoutFlow () {
  while (true) {
    yield take(REQUEST_LOGOUT)
    localStorage.removeItem('auth-token');
    yield put({type: 'RESET_REDUX'})
    yield put(push('/login'))
  }
}
