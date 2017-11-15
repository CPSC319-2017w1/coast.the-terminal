import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { LIVE_SITE } from '../constants/urls.js';

function addNewRowFailed(error, tableName) {
  return {
    type: ACTIONS.ADD_NEW_ROW_FAILED,
    error,
    tableName
  };
}

function addNewRowSuccessful(data, tableName) {
  return {
    type: ACTIONS.ADD_NEW_ROW,
    data,
    tableName
  };
}

export function addNewRow(tableName, bodyName, data) {
  return dispatch => {
    return request
      .post(`${LIVE_SITE}${tableName}/add`)
      .query(data)
      .then(res => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(addNewRowSuccessful(body[bodyName], tableName));
      }).catch((err) => {
        dispatch(addNewRowFailed(err.message, tableName));
      });
  };
}
