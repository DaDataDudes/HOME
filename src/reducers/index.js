import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
// Reducers
import base from 'reducers/rebase';
import documents from 'reducers/documents';
import counties from 'reducers/counties';
import auth from 'reducers/auth';
import chartData from 'reducers/chartData';

const rootReducer = combineReducers({
  auth,
  chartData,
  documents,
  counties,
  base,
  routing
});

export default rootReducer;
