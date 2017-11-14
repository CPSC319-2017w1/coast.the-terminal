import * as ACTIONS from '../constants/action-types.js';

const mainInitialState = {
  skills: {
    data: [],
    error: false
  },
  paygrades: {
    data: [],
    error: false
  },
  positionRoles: {
    data: [],
    error: false
  },
  hiringManagers: {
    data: [],
    error: false
  },
  fxrates: {
    data: [],
    error: false
  }
};

export default function tables(state = mainInitialState, action) {
  switch (action.type) {
    case ACTIONS.VIEW_SKILLS:
      return Object.assign({}, state, {
        skills: { data: action.data, error: false }
      });
    case ACTIONS.VIEW_PAYGRADES:
      return Object.assign({}, state, {
        paygrades: { data: action.data, error: false }
      });
    case ACTIONS.VIEW_POSITIONROLES:
      return Object.assign({}, state, {
        positionRoles: { data: action.data, error: false }
      });
    case ACTIONS.VIEW_HIRINGMANAGERS:
      return Object.assign({}, state, {
        hiringManagers: { data: action.data, error: false }
      });
    case ACTIONS.VIEW_FXRATES:
      return Object.assign({}, state, {
        fxrates: { data: action.data, error: false }
      });
    case ACTIONS.VIEW_SKILLS_FAILED:
      return Object.assign({}, state, {
        skills: { error: action.error, data: [] }
      });
    case ACTIONS.VIEW_PAYGRADES_FAILED:
      return Object.assign({}, state, {
        paygrades: { error: action.error, data: [] }
      });
    case ACTIONS.VIEW_POSITIONROLES_FAILED:
      return Object.assign({}, state, {
        positionRoles: { error: action.error, data: [] }
      });
    case ACTIONS.VIEW_HIRINGMANAGERS_FAILED:
      return Object.assign({}, state, {
        hiringManagers: { error: action.error, data: [] }
      });
    case ACTIONS.VIEW_FXRATES_FAILED:
      return Object.assign({}, state, {
        fxrates: { error: action.error, data: [] }
      });
    default:
      return state;
  }
}
