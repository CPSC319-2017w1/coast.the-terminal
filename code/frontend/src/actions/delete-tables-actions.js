import request from 'superagent';
import { DELETE_ROW_FAILED } from '../constants/action-types.js';
import { LIVE_SITE } from '../constants/urls.js';
import { viewTableRows } from './view-tables-actions.js';
import { loginFailed } from './login-actions.js';

function deleteRowFailed(error, tableName) {
  return {
    type: DELETE_ROW_FAILED,
    error,
    tableName
  };
}

export function deleteRow(tableName, data, successCallback) {
  return dispatch => {
    return request
      .post(`${LIVE_SITE}${tableName}/delete`)
      .query(data)
      .then(res => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        if (typeof successCallback !== 'undefined') {
          successCallback();
        }
        dispatch(viewTableRows(tableName, data.token));
      }).catch((err) => {
        dispatch(deleteRowFailed(err.message, tableName));
        if (err.message.toLowerCase() === 'user is not logged in') {
          dispatch(loginFailed('Login session has timed out. Please sign in again.'));
        }
      });
  };
}
