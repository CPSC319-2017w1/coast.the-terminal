import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { LIVE_SITE, LOCALHOST } from '../constants/urls.js';
import { loginFailed } from './login-actions.js';

function viewTableSuccessful(tableName, data) {
  return {
    type: ACTIONS.VIEW_TABLES,
    data,
    tableName
  };
}

function viewTableFailed(tableName, error) {
  return {
    type: ACTIONS.VIEW_TABLES_FAILED,
    error,
    tableName
  };
}

export function viewTableRows(tableName, token) {
  return dispatch => {
    return request
      .get(`${LIVE_SITE}${tableName}/view`)
      .query({token})
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(viewTableSuccessful(tableName, body.data));
      }).catch((err) => {
        dispatch(viewTableFailed(tableName, err.message));
        if (err.message.toLowerCase() === 'user is not logged in') {
          dispatch(loginFailed('Login session has timed out. Please sign in again.'));
        }
      });
  };
}
