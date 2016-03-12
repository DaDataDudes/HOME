import { LOGIN_SUCCESS } from '../actions/auth';

const initialState = {
  username: null
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
}
