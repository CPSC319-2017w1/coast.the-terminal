import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { LIVE_SITE } from '../constants/urls.js';
import { viewTableRows } from './view-tables-actions.js';
import { loginFailed } from './login-actions.js';

function addNewRowFailed(error, tableName) {
  return {
    type: ACTIONS.ADD_NEW_ROW_FAILED,
    error,
    tableName
  };
}

export function addNewRow(tableName, data) {
  return dispatch => {
    return request
      .post(`${LIVE_SITE}${tableName}/add`)
      .query(data)
      .then(res => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(viewTableRows(tableName, data.token));
      }).catch((err) => {
        dispatch(addNewRowFailed(err.message, tableName));
        if (err.message.toLowerCase() === 'user is not logged in') {
          dispatch(loginFailed('Login session has timed out. Please sign in again.'));
        }
      });
  };
}
