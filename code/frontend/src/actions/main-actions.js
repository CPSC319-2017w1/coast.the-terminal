import * as ACTIONS from '../constants/action-types.js';

export function switchView(tab) {
  return {
    type: ACTIONS.SWITCH_TAB,
    tab
  };
}

export function isLoading() {
  return {
    type: ACTIONS.TOGGLE_LOADING,
    isLoading: true
  };
}

export function hasStoppedLoading() {
  return {
    type: ACTIONS.TOGGLE_LOADING,
    isLoading: false
  };
}
