import {SWITCH_TAB} from '../actions/index';

const initialState = {
  tab: 'home'
};

export function main(state = initialState, action) {
  switch (action.type) {
    case SWITCH_TAB:
      return Object.assign({}, state, {
        tab: action.tab
      });
    default:
      return state;
  }
}
