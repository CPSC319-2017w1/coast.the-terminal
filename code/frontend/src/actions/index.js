import * as ACTIONS from '../constants';

export function switchView(tab) {
  return {
    type: ACTIONS.SWITCH_TAB,
    tab
  };
}

export function loginUser(username, password) {
  console.log('login button clicked'); //eslint-disable-line
  console.log('login username: ' + username); //eslint-disable-line
  console.log('login password: ' + password); //eslint-disable-line
  // todo: create API call to log in the user, for now just log in the user
  return {
    type: ACTIONS.LOGIN,
    username
  };
}
