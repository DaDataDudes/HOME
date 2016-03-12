import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
// Reducers
import firebase from 'reducers/firebase';
import documents from 'reducers/documents';
import auth from 'reducers/auth';

const rootReducer = combineReducers({
  documents,
  firebase,
  routing,
  auth,
});

export default rootReducer;
