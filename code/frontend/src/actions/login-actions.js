import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { LIVE_SITE } from '../constants/urls.js';
import { isLoading, hasStoppedLoading } from './main-actions.js';

function loginFailed(error) {
  return {
    type: ACTIONS.LOGIN_FAILED,
    error
  };
}

function loginSuccessful(username, isAdmin, token) {
  return {
    type: ACTIONS.LOGIN,
    username,
    isAdmin,
    token
  };
}

export function loginUser(username, password, cookies) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .get(`${LIVE_SITE}login`)
      .query({ username, password })
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        cookies.set('token', body.token);
        cookies.set('username', username);
        dispatch(hasStoppedLoading());
        dispatch(loginSuccessful(body.username, body.permissions === 'admin', body.token));
      }).catch((err) => {
        dispatch(hasStoppedLoading());
        dispatch(loginFailed(err.message));
      });
  };
}

export function validateSession(username, token, cookies) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .get(`${LIVE_SITE}refresh`)
      .query({ username, token })
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        cookies.set('token', token);
        cookies.set('username', username);
        dispatch(hasStoppedLoading());
        dispatch(loginSuccessful(body.username, body.permissions === 'admin', body.token));
      }).catch((err) => {
        cookies.remove('token');
        cookies.remove('username');
        dispatch(hasStoppedLoading());
        dispatch(loginFailed(err.message));
      });
  };
}
