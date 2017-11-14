import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { isLoading, hasStoppedLoading } from './main-actions.js';

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

function skillsSuccessful(skills) {
  return {
    type: ACTIONS.VIEW_SKILLS;
    skills,
  };
}

function fxratesSuccessful(fxrates) {
  return {
    type: ACTIONS.VIEW_FXRATES,
    fxrates
  };
}

function usersSuccessful(users) {
  return {
    type: ACTIONS.VIEW_USERS,
    users
  };
}

export function viewSkills() {
  return dispatch => {
    dispatch(isLoading());
    return request
      .get('http://theterminal-env.us-west-2.elasticbeanstalk.com/skills/view')
      .query()
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hasStoppedLoading());
        dispatch(skillsSuccessful(body.skills));
      }).catch((err) => {
        dispatch(hasStoppedLoading());
        dispatch(skillsFailed(err.message));
      });
  };
}

export function viewFxRates() {
  return dispatch => {
    dispatch(isLoading());
    return request
      .get('http://theterminal-env.us-west-2.elasticbeanstalk.com/fxrates/view')
      .query()
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hasStoppedLoading());
        dispatch(fxratesSuccessful(body.rates);
      }).catch(err) => {
        dispatch(hasStoppedLoading());
        dispatch(fxratesFailed(err.message));
      });
  };
}

export function viewUsers() {
  return dispatch => {
    dispatch(isLoading());
    return request
      .get('http://theterminal-env.us-west-2.elasticbeanstalk.com/users/view')
      .query()
      .then((res) => {
        const body = res.body;
        if (!res.ok || body.error) {
          throw new Error(body.errorMessage);
        }
        dispatch(hasStoppedLoading());
        dispatch(usersSuccessful(body.rates);
      }).catch(err) => {
        dispatch(hasStoppedLoading());
        dispatch(usersFailed(err.message));
      });
  };
}
