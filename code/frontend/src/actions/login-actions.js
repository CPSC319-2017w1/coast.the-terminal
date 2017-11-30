import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { LIVE_SITE } from '../constants/urls.js';
import { isLoading, hasStoppedLoading } from './main-actions.js';

/**
 * Action to be dispatched when the call to backend has failed
 * @param {string} error - Error message
 * */
export function loginFailed(error) {
  return {
    type: ACTIONS.LOGIN_FAILED,
    error
  };
}

/**
 * Action to be dispatched when the call to backend has been successful
 * @param {string} username - The username of the currently logged in user
 * @param {boolean} isAdmin - Whether the current user has admin privileges
 * @param {string} token - Session token of the current user
 * */
function loginSuccessful(username, isAdmin, token) {
  return {
    type: ACTIONS.LOGIN,
    username,
    isAdmin,
    token
  };
}

/**
 * Call backend to log in the user
 * @param {string} username - Inputted username
 * @param {string} password - Inputted password
 * @param {object} cookies - The cookies object which enables setting, getting, and removing cookies
 * */
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

/**
 * Call backend to validate the login session of the current user
 * @param {string} username - Current user
 * @param {string} token - Session token of the current user
 * @param {object} cookies - The cookies object which enables setting, getting, and removing cookies
 * */
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
        dispatch(loginSuccessful(username, body.permissions === 'admin', token));
      }).catch((err) => {
        cookies.remove('token');
        cookies.remove('username');
        dispatch(hasStoppedLoading());
        dispatch(loginFailed(`${err.message} - Please sign in again.`));
      });
  };
}

/**
 * Action to be dispatched to log out the user from the frontend
 * */
export function logoutUser() {
  return {
    type: ACTIONS.LOGOUT
  };
}

/**
 * Call backend to expire the session of the current user in the backend
 * @param {string} username - Current user
 * @param {string} token - Session token of the current user
 * */
export function logout(username, token) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .get(`${LIVE_SITE}logout`)
      .query({ username, token })
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hasStoppedLoading());
        dispatch(logoutUser());
      }).catch((err) => {
        dispatch(hasStoppedLoading());
        dispatch(logoutUser());
        dispatch(loginFailed(`Failed to remove session from backend: ${err.message}`));
      });
  };
}
