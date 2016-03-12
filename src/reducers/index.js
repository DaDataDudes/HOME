import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
// Reducers
import firebase from 'reducers/firebase';
import documents from 'reducers/documents';
import auth from 'reducers/auth';
import chartData from 'reducers/chartData';

const rootReducer = combineReducers({
  auth,
  chartData,
  documents,
  firebase,
  routing
});

export default rootReducer;
