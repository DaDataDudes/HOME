import { GET_DATA_SUCCESS } from '../actions/charts';

const initialState = {
  data: null,
};

export default function chartData(state = initialState, action = {}) {
  switch (action.type) {
    case GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}
