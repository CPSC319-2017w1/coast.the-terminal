import * as ACTIONS from '../constants/action-types.js';

const initialState = {
  error: false,
  data: []
};

export default function contractors(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_CONTRACTOR:
    case ACTIONS.EDIT_CONTRACTOR:
    case ACTIONS.VIEW_CONTRACTORS:
      return Object.assign({}, state, {
        error: false,
        data: action.data
      });
    case ACTIONS.ADD_CONTRACTOR_FAILED:
    case ACTIONS.EDIT_CONTRACTOR_FAILED:
    case ACTIONS.VIEW_CONTRACTORS_FAILED:
      return Object.assign({}, state, {
        error: action.error
      });
    default:
      return state;
  }
}