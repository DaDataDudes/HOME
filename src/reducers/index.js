import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from 'reducers/auth';
import chartData from 'reducers/chartData';

const rootReducer = combineReducers({
  auth,
  chartData,
  routing,
});

export default rootReducer;
