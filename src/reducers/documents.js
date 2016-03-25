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
      let list = Object.keys(action.payload)
        .map((key) => { return action.payload[key]; })
        .filter((value) => { return typeof value == 'object';})

      return {
        deleted: null,
        list,
        previous: [],
      };

    case DELETE_DOCUMENT_SUCCESS:
      return {
        deleted: action.payload,
        list: state.list.filter(document => {
          return document.key !== action.payload.key;
        }),
        previous: [ ...state.list ],
      };

    case UPDATE_DOCUMENT_SUCCESS:
      return {
        deleted: null,
        list: state.list.map(document => {
          return document.key === action.payload.key ? action.payload : document;
        }),
        previous: [],
      };

    default:
      return state;
  }
}
