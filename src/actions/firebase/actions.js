import {
  CREATE_DOCUMENT_ERROR,
  CREATE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_ERROR,
  DELETE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_ERROR,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_COUNT_SUCCESS,
  UPDATE_COUNTY_SUCCESS,
  UPDATE_COUNTY_ERROR,
  CREATE_COUNTY_SUCCESS,
  GET_DOCUMENT_SUCCESS,
} from './action-types';
import choroData from 'seed/counties';

export function createDocument(document) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const locationId = choroData.find(location => location.id === document.location);
    locationId.total++;
    firebase.child(`documents`)
      .push(document, error => {
        if (error) {
          console.error('ERROR @ createDocument :', error);
          dispatch({
            type: CREATE_DOCUMENT_ERROR,
            payload: error,
          });
        }
      });
  }
}

export function deleteDocument(document) {
  return (dispatch, getState) => {
    const { firebase } = getState();

    firebase.child(`documents/${document.key}`)
      .remove(error => {
        if (error) {
          console.error('ERROR @ deleteDocument :', error);
          dispatch({
            type: DELETE_DOCUMENT_ERROR,
            payload: error,
          });
        }
      });
  };
}

export function undeleteDocument() {
  return (dispatch, getState) => {
    const { firebase, documents } = getState();
    const document = documents.deleted;

    firebase.child(`documents/${document.key}`)
      .set(document, error => {
        if (error) {
          console.error('ERROR @ undeleteDocument :', error);
        }
      });
  };
}

export function updateDocument(document, changes) {
  return (dispatch, getState) => {
    const { firebase } = getState();

    firebase.child(`documents/${document.key}`)
      .update(changes, error => {
        if (error) {
          console.error('ERROR @ updateDocument :', error);
          dispatch({
            type: UPDATE_DOCUMENT_ERROR,
            payload: error,
          });
        }
      });
  };
}


export function updateCounty(county, changes) {
  return (dispatch, getState) => {
    const { firebase } = getState();

    firebase.child(`counties/${county.key}`)
      .update(changes, error => {
        if (error) {
          console.error('ERROR @ updateCounty :', error);
          dispatch({
            type: UPDATE_COUNTY_ERROR,
            payload: error,
          });
        }
      });
  };
}


export function registerListeners() {
  return (dispatch, getState) => {
    const { firebase }  = getState();
    const ref = firebase.child(`documents`);

    ref.on('value', snapshot => dispatch({
      type: GET_DOCUMENT_SUCCESS,
      payload: _recordFromSnapShot(snapshot),
    }));

    ref.on('child_changed', snapshot => dispatch({
      type: UPDATE_DOCUMENT_SUCCESS,
      payload: _recordFromSnapShot(snapshot),
    }));

    ref.on('child_removed', snapshot => dispatch({
      type: DELETE_DOCUMENT_SUCCESS,
      payload: _recordFromSnapShot(snapshot),
    }));

  };
}

export function registerListenersCounties() {
  return (dispatch, getState) => {
    const { firebase }  = getState();
    const ref = firebase.child(`counties`);

    ref.on('child_changed', snapshot => dispatch({
      type: UPDATE_COUNT_SUCCESS,
      payload: _recordFromSnapShot(snapshot),
    }));

  };
}

function _recordFromSnapShot(snapshot, ref) {
  let record = snapshot.val();
  record.key = snapshot.key();
  return record;
}
