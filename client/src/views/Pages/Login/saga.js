import { fork } from 'redux-saga/effects'
import { loginFlow } from '../../../sagas'

export default function* rootSaga() {
  yield fork(loginFlow) // or yield loginFlow()
}