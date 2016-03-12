import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
// Reducers
import firebase from 'reducers/firebase';
import counter from 'reducers/counter';
import todo from 'reducers/todo';
import documents from 'reducers/documents';
import auth from 'reducers/auth';
import chartData from 'reducers/chartData';

const rootReducer = combineReducers({
  auth,
  chartData,
  counter,
  todo,
  documents,
  firebase,
  routing,
  auth,
});

export default rootReducer;
