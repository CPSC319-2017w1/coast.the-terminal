import * as ACTIONS from '../constants/action-types.js';

/**
 * Action to be dispatched when another tab in the navbar has been selected
 * @param {string} tab - ID of the new tab to be displayed
 * */
export function switchView(tab) {
  return {
    type: ACTIONS.SWITCH_TAB,
    tab
  };
}

/**
 * Action to be dispatched when loading spinner needs to be displayed
 * */
export function isLoading() {
  return {
    type: ACTIONS.TOGGLE_LOADING,
    isLoading: true
  };
}

/**
 * Action to be dispatched when loading spinner needs to stop displaying
 * */
export function hasStoppedLoading() {
  return {
    type: ACTIONS.TOGGLE_LOADING,
    isLoading: false
  };
}
