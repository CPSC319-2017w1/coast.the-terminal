import * as ACTIONS from '../constants/action-types.js';

const initialState = {
  error: false,
  data: []
};

export default function reportData(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.VIEW_REPORT_DATA:
      return Object.assign({}, state, {
        error: false,
        data: action.data
      });
    case ACTIONS.VIEW_REPORT_DATA_FAILED:
      return Object.assign({}, state, {
        error: action.error
      });
    default:
      return state;
  }
}