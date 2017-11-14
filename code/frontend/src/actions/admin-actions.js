import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { LIVE_SITE } from '../constants/urls.js';

function skillsFailed(error) {
  return {
    type: ACTIONS.VIEW_SKILLS_FAILED,
    error
  };
}

function fxratesFailed(error) {
  return {
    type: ACTIONS.VIEW_FXRATES_FAILED,
    error
  };
}

function usersFailed(error) {
  return {
    type: ACTIONS.VIEW_USERS_FAILED,
    error
  };
}

function paygradesFailed(error) {
  return {
    type: ACTIONS.VIEW_PAYGRADES_FAILED,
    error
  };
}

function positionRolesFailed(error) {
  return {
    type: ACTIONS.VIEW_POSITIONROLES_FAILED,
    error
  };
}

function hiringManagersFailed(error) {
  return {
    type: ACTIONS.VIEW_HIRINGMANAGERS_FAILED,
    error
  };
}

function skillsSuccessful(data) {
  return {
    type: ACTIONS.VIEW_SKILLS,
    data
  };
}

function fxratesSuccessful(data) {
  return {
    type: ACTIONS.VIEW_FXRATES,
    data
  };
}

function usersSuccessful(data) {
  return {
    type: ACTIONS.VIEW_USERS,
    data
  };
}

function paygradesSuccessful(data) {
  return {
    type: ACTIONS.VIEW_PAYGRADES,
    data
  };
}

function positionRolesSuccessful(data) {
  return {
    type: ACTIONS.VIEW_POSITIONROLES,
    data
  };
}

function hiringManagersSuccessful(data) {
  return {
    type: ACTIONS.VIEW_HIRINGMANAGERS,
    data
  };
}

export function viewSkills() {
  return dispatch => {
    return request
      .get(`${LIVE_SITE}skills/view`)
      .query()
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(skillsSuccessful(body.skills));
      }).catch((err) => {
        dispatch(skillsFailed(err.message));
      });
  };
}

export function viewFxRates() {
  return dispatch => {
    return request
      .get(`${LIVE_SITE}fxrates/view`)
      .query()
      .then(res => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(fxratesSuccessful(body.rates));
      }).catch((err) => {
        dispatch(fxratesFailed(err.message));
      });
  };
}

export function viewUsers() {
  return dispatch => {
    return request
      .get(`${LIVE_SITE}users/view`)
      .query()
      .then(res => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(usersSuccessful(body.users));
      }).catch((err) => {
        dispatch(usersFailed(err.message));
      });
  };
}

export function viewPaygrades() {
  return dispatch => {
    return request
      .get(`${LIVE_SITE}paygrades/view`)
      .query()
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(paygradesSuccessful(body.payGrades));
      }).catch((err) => {
        dispatch(paygradesFailed(err.message));
      });
  };
}

export function viewPositionRoles() {
  return dispatch => {
    return request
      .get(`${LIVE_SITE}hrroles/view`)
      .query()
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(positionRolesSuccessful(body.hrPositionRoles));
      }).catch((err) => {
        dispatch(positionRolesFailed(err.message));
      });
  };
}

export function viewHiringManagers() {
  return dispatch => {
    return request
      .get(`${LIVE_SITE}hiringmanagers/view`)
      .query()
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hiringManagersSuccessful(body.hiringManagers));
      }).catch((err) => {
        dispatch(hiringManagersFailed(err.message));
      });
  };
}
