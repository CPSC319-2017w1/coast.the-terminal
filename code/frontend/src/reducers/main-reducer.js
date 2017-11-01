import * as ACTIONS from '../constants/action-types.js';
import { DASHBOARD } from '../constants/tabs.js';

const mainInitialState = {
  tab: DASHBOARD,
  isLoading: false
};

export default function main(state = mainInitialState, action) {
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
