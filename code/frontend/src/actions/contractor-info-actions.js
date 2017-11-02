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

function viewContractorSuccessful(data) {
  return {
    type: ACTIONS.VIEW_CONTRACTORS,
    data
  };
}

function viewContractorFailed(error) {
  return {
    type: ACTIONS.VIEW_CONTRACTORS_FAILED,
    error
  };
}

// TODO
export function addContractor(data) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .post('https://localhost:8443/contractors/add')
      .type('application/json')
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

// TODO
export function editContractor(data) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .post('https://localhost:8443/contractors/edit')
      .type('application/json')
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

export function viewContractors() {
  return dispatch => {
    dispatch(isLoading());
    return request
      .get('https://localhost:8443/contractors/view')
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hasStoppedLoading());
        dispatch(viewContractorSuccessful(body.contractors));
      }).catch((err) => {
        dispatch(hasStoppedLoading());
        dispatch(viewContractorFailed(err.message));
      });
  };
}
