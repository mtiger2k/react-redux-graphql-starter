import { take, put, fork } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { REQUEST_LOGOUT } from '../../../modules/auth'
import { logoutFlow } from '../../../sagas'

export default function* rootSaga() {
  yield fork(logoutFlow)
}