import { combineReducers } from 'redux';
import main from './main-reducer.js';
import user from './user-reducer.js';

const reducer = combineReducers({
  main,
  user
});
export default reducer;
