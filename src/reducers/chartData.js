import {
  UPDATE_DATA_SUCCESS,
  GET_CHOROINFO_SUCCESS,
  UPDATE_CHOROINFO_SUCCESS,
} from 'actions/charts';

const initialState = {
  info: {
    id: 0,
    location: 'Hawaii',
    total: 0,
  },
  data: null,
};

export default function chartData(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CHOROINFO_SUCCESS:
      return {
        ...state,
        choroInfo: action.choroInfo,
      };
    case UPDATE_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case UPDATE_CHOROINFO_SUCCESS:
      return {
        ...state,
        info: action.info,
      };
    default:
      return state;
  }
}
