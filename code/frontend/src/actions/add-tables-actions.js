import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { LIVE_SITE } from '../constants/urls.js';
import { viewTableRows } from './view-tables-actions.js';
import { loginFailed } from './login-actions.js';

/**
 * Action to be dispatched when the call to backend has failed
 * @param {string} error - Error message
 * @param {string} tableName - The table in question
 * */
function addNewRowFailed(error, tableName) {
  return {
    type: ACTIONS.ADD_NEW_ROW_FAILED,
    error,
    tableName
  };
}

/**
 * Call backend to add a new row
 * @param {string} tableName - The table in question
 * @param {object} data - The query to be sent to the backend
 * @param {function} successCallback - Callback function in case of success
 * */
export function addNewRow(tableName, data, successCallback) {
  return dispatch => {
    return request
      .post(`${LIVE_SITE}${tableName}/add`)
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
        dispatch(addNewRowFailed(err.message, tableName));
        if (err.message.toLowerCase() === 'user is not logged in') {
          dispatch(loginFailed('Login session has timed out. Please sign in again.'));
        }
      });
  };
}
