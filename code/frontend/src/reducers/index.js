import { combineReducers } from 'redux';
import main from './main-reducer.js';
import user from './user-reducer.js';
import contractors from './contractor-info-reducer.js';
import tables from './tables-reducer.js';

const reducer = combineReducers({
  main,
  user,
  contractors,
  tables
});
export default reducer;
