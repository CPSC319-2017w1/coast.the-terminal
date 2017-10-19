import * as ACTIONS from '../constants/index';

const mainInitialState = {
  tab: 'home',
  isLoading: false
};

export function main(state = mainInitialState, action) {
  switch (action.type) {
    case ACTIONS.SWITCH_TAB:
      return Object.assign({}, state, {
        tab: action.tab,
        isLoading: false
      });
    case ACTIONS.TOGGLE_LOADING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    default:
      return state;
  }
}

const userInitialState = {
  isLoggedIn: false,
  isAdmin: false,
  username: '',
  error: false
};

export function user(state = userInitialState, action) {
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