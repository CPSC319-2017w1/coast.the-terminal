import * as ACTIONS from '../constants/action-types.js';

const userInitialState = {
  isLoggedIn: false,
  isAdmin: false,
  username: '',
  error: false
};

export default function user(state = userInitialState, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true,
        isAdmin: action.isAdmin,
        username: action.username,
        error: false
      });
    case ACTIONS.LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isAdmin: false,
        username: '',
        error: false
      });
    case ACTIONS.LOGIN_FAILED:
      return Object.assign({}, state, {
        error: action.error
      });
    default:
      return state;
  }
}
