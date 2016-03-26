import {
  CREATE_DOCUMENT_ERROR,
  CREATE_DOCUMENT_SUCCESS,
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
    const { base } = getState();
    const locationId = choroData.find(location => location.id === document.location);
    locationId.total++;
    base.push('documents', {
      data: document,
    });
  };
}

export function updateDocument(document, changes) {
  return (dispatch, getState) => {
    const { base } = getState();
    base.post(`documents/${document.key}`, {
      data: document
    });
  };
}

export function updateCounty(county, changes) {
  return (dispatch, getState) => {
    const { base } = getState();
    base.post(`counties/${county.key}`{
      data: county
    });
  };
}

export function registerListeners() {
  return (dispatch, getState) => {
    const { base }  = getState();
    base.syncState(`documents`, {
      context: this,
      state: 'documents',
      asArray: true
    });
  };
}

export function registerListenersCounties() {
  return (dispatch, getState) => {
    const { base }  = getState();
    base.syncState(`counties`, {
      context: this,
      state: 'counties',
      asArray: true
    });
  };
}

function _recordFromSnapShot(snapshot, ref) {
  let record = snapshot.val();
  record.key = snapshot.key();
  return record;
}
