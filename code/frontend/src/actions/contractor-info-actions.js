import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { LIVE_SITE } from '../constants/urls.js';
import { isLoading, hasStoppedLoading } from './main-actions.js';

function addContractorSuccessful() {
  return {
    type: ACTIONS.ADD_CONTRACTOR
  };
}

function addContractorFailed(error) {
  return {
    type: ACTIONS.ADD_CONTRACTOR_FAILED,
    error
  };
}

function editContractorSuccessful() {
  return {
    type: ACTIONS.EDIT_CONTRACTOR
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

export function addContractor(data, callback) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .post(`${LIVE_SITE}contractors/add`)
      .query(data)
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hasStoppedLoading());
        dispatch(addContractorSuccessful());
        callback();
      }).catch((err) => {
        dispatch(hasStoppedLoading());
        dispatch(addContractorFailed(err.message));
        callback();
      });
  };
}

export function addEngagementContract(data, callback) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .post('http://localhost:8080/contractors/add/engagementContract')
      .query(data)
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hasStoppedLoading());
        dispatch(addContractorSuccessful());
        callback();
      }).catch((err) => {
        dispatch(hasStoppedLoading());
        dispatch(addContractorFailed(err.message));
      });
  }
}

export function getSkills(data, callback) {
    return dispatch => {

    };
}

export function editContractor(data) {
  return dispatch => {
    dispatch(isLoading());
    return request
      .post(`${LIVE_SITE}contractors/edit`)
      .query(data)
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hasStoppedLoading());
        dispatch(editContractorSuccessful());
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
      .get(`${LIVE_SITE}contractors/view`)
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
