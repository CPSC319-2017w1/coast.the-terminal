import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';

export function switchView(tab) {
  return {
    type: ACTIONS.SWITCH_TAB,
    tab
  };
}

export function isLoading() {
  return {
    type: ACTIONS.TOGGLE_LOADING,
    isLoading: true
  };
}

export function hasStoppedLoading() {
  return {
    type: ACTIONS.TOGGLE_LOADING,
    isLoading: false
  };
}

export function loginFailed(error) {
  return {
    type: ACTIONS.LOGIN_FAILED,
    error
  };
}

export function loginSuccessful(username, isAdmin) {
  return {
    type: ACTIONS.LOGIN,
    username,
    isAdmin
  };
}

export function loginUser(username, password) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .get('https://localhost:8443/login')
      .query({ username, password })
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hasStoppedLoading());
        dispatch(loginSuccessful(body.username, body.permissions === 'admin'));
      }).catch((err) => {
        dispatch(hasStoppedLoading());
        dispatch(loginFailed(err.message));
      });
  };
}
