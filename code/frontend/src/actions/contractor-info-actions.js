import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { isLoading, hasStoppedLoading } from './main-actions.js';

function addContractorSuccessful(data) {
  return {
    type: ACTIONS.ADD_CONTRACTOR,
    data
  };
}

function addContractorFailed(error) {
  return {
    type: ACTIONS.ADD_CONTRACTOR_FAILED,
    error
  };
}

function editContractorSuccessful(data) {
  return {
    type: ACTIONS.EDIT_CONTRACTOR,
    data
  };
}

function editContractorFailed(error) {
  return {
    type: ACTIONS.EDIT_CONTRACTOR_FAILED,
    error
  };
}

export function addContractor(data) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .post('https://localhost:8443/???')
      .send(data)
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hasStoppedLoading());
        dispatch(addContractorSuccessful(body.data));
      }).catch((err) => {
        dispatch(hasStoppedLoading());
        dispatch(addContractorFailed(err.message));
      });
  };
}

export function editContractor(data) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .post('https://localhost:8443/???')
      .send(data)
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hasStoppedLoading());
        dispatch(editContractorSuccessful(body.data));
      }).catch((err) => {
        dispatch(hasStoppedLoading());
        dispatch(editContractorFailed(err.message));
      });
  };
}
