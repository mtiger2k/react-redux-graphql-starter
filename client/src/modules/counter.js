import update from 'immutability-helper';
import { REQUEST, SUCCESS, FAILURE } from './actionType'

export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED'
export const DECREMENT = 'counter/DECREMENT'

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(INCREMENT):
      return update(state, {isIncrementing: {$set: true}});

    case SUCCESS(INCREMENT):
      return update(state, {count: {$set: state.count + 1}, isIncrementing: {$set: !state.isIncrementing}});

    case REQUEST(DECREMENT):
      return update(state, {isDecrementing: {$set: true}});

    case SUCCESS(DECREMENT):
      return update(state, {count: {$set: state.count - 1}, isDecrementing: {$set: !state.isDecrementing}});

    default:
      return state
  }
}

export const increment = () => {
  return dispatch => {
    dispatch({
      type: REQUEST(INCREMENT)
    })

    dispatch({
      type: SUCCESS(INCREMENT)
    })
  }
}

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT,
      payload: new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 3000)
      })
    })

  }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: REQUEST(DECREMENT)
    })

    dispatch({
      type: SUCCESS(DECREMENT)
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT,
      payload: new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 3000)
      })
    })

  }
}

