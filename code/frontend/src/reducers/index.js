import * as ACTIONS from '../constants/index';

const mainInitialState = {
  tab: 'home'
};

export function main(state = mainInitialState, action) {
  switch (action.type) {
    case ACTIONS.SWITCH_TAB:
      return Object.assign({}, state, {
        tab: action.tab
      });
    default:
      return state;
  }
}

const userInitialState = {
  isLoggedIn: false,
  isAdmin: false,
  username: ''
};

export function user(state = userInitialState, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true
      });
    case ACTIONS.LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false
      });
    case ACTIONS.SET_USERNAME:
      return Object.assign({}, state, {
        username: action.username
      });
    case ACTIONS.SET_ISADMIN:
      return Object.assign({}, state, {
        isAdmin: action.isAdmin
      });
    default:
      return state;
  }
}