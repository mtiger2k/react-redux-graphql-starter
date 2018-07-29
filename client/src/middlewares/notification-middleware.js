import { toast } from 'react-toastify';

function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }

  return false;
}

export default () => next => action => {
  // If not a promise, continue on
  if (!isPromise(action.payload)) {
    return next(action);
  }

  /**
   *
   * The notification middleware serves to dispatch the initial pending promise to
   * the promise middleware, but adds a `then` and `catch.
   */
  return next(action)
    .then(response => {
      if (action.meta && action.meta.successMessage) {
        toast.success(action.meta.successMessage);
      }
      return Promise.resolve(response);
    })
    .catch(error => {
      if (action.meta && action.meta.errorMessage) {
        toast.error(action.meta.errorMessage);
      }
      return Promise.reject(error);
    });
};