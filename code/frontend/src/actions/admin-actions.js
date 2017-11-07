import request from 'superagent';
import * as ACTIONS from '../constants/action-types.js';
import { isLoading, hasStoppedLoading } from './main-actions.js';

function skillsFailed(error) {
  return {
    type: ACTIONS.VIEW_SKILLS_FAILED,
    error
  };
}

function skillsSuccessful(skills) {
  return {
    type: ACTIONS.VIEW_SKILLS;
    skills,
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

