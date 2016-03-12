export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function login(username) {
  return {
    type: LOGIN_SUCCESS,
    username,
  };
}


