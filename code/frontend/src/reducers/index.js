import { combineReducers } from 'redux';
import main from './main-reducer.js';
import user from './user-reducer.js';
import contractors from './contractor-info-reducer.js';
import tables from './tables-reducer.js';
import reportData from './report-data-reducer.js'

const reducer = combineReducers({
  main,
  user,
  contractors,
  tables,
  reportData
});
export default reducer;
