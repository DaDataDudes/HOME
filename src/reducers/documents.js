import {
  CREATE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_SUCCESS,
  GET_DOCUMENT_SUCCESS,
} from 'actions/firebase';

export const initialState = {
  deleted: null,
  list: [],
  previous: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case GET_DOCUMENT_SUCCESS:
      return {
        deleted: null,
        list: action.payload,
        previous: [],
      };

    default:
      return state;
  }
}
