import * as ACTIONS from '../constants/action-types.js';

const userInitialState = {
  isLoggedIn: false,
  isAdmin: false,
  username: '',
  error: false,
  token: ''
};

export default function user(state = userInitialState, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true,
        isAdmin: action.isAdmin,
        username: action.username,
        error: false,
        token: action.token
      });
    case ACTIONS.LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isAdmin: false,
        username: '',
        error: false,
        token: ''
      });
    case ACTIONS.LOGIN_FAILED:
      return Object.assign({}, state, {
        error: action.error,
        username: '',
        isLoggedIn: false,
        token: '',
        isAdmin: false
      });
    default:
      return state;
  }
}
