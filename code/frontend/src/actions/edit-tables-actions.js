import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { LIVE_SITE } from '../constants/urls.js';
import { viewTableRows } from './view-tables-actions.js';

function editRowFailed(error, tableName) {
  return {
    type: ACTIONS.EDIT_ROW_FAILED,
    error,
    tableName
  };
}

export function editRow(tableName, data) {
  return dispatch => {
    return request
      .post(`${LIVE_SITE}${tableName}/edit`)
      .query(data)
      .then(res => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(viewTableRows(tableName, data.token));
      }).catch((err) => {
        dispatch(editRowFailed(err.message, tableName));
      });
  };
}
