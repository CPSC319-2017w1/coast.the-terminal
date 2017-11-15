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
  hrroles: {
    data: [],
    error: false
  },
  hiringmanagers: {
    data: [],
    error: false
  },
  fxrates: {
    data: [],
    error: false
  },
  users: {
    data: [],
    error: false
  }
};

export default function tables(state = mainInitialState, action) {
  switch (action.type) {
    case ACTIONS.VIEW_TABLES:
      return Object.assign({}, state, {
        [action.tableName]: { data: action.data, error: false }
      });
    case ACTIONS.VIEW_TABLES_FAILED:
    case ACTIONS.ADD_NEW_ROW_FAILED:
      return Object.assign({}, state, {
        [action.tableName]: { error: action.error, data: state[action.tableName].data }
      });
    case ACTIONS.ADD_NEW_ROW:
      const data = [];
      data.push(state[action.tableName].data);
      data.push(action.data);
      return Object.assign({}, state, {
        [action.tableName]: { data, error: false }
      });
    default:
      return state;
  }
}
