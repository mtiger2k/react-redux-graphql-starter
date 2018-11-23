import { fork } from 'redux-saga/effects'
import { logoutFlow } from '../../../sagas'

export default function* rootSaga() {
  yield fork(logoutFlow)
}