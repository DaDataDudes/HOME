import {
  UPDATE_COUNT_SUCCESS,
  UPDATE_COUNTY_SUCCESS,
  CREATE_COUNTY_SUCCESS,
} from 'actions/firebase';

export const initialState = {
  deleted: null,
  list: [],
  previous: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_COUNTY_SUCCESS:
      let list;
      if (state.deleted && state.deleted.key === action.payload.key) {
        list = [ ...state.previous ];
      }
      else {
        list = [ action.payload, ...state.list ];
      }
      return {
        deleted: null,
        list,
        previous: [],
      };

    case UPDATE_COUNT_SUCCESS:
      return {
        deleted: null,
        list: state.list.map(county => {
          return county.key === action.payload.key ? action.payload : county;
        }),
        previous: [],
      };

    default:
      return state;
  }
}
