export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const ACCESS_TOKEN_PENDING = 'ACCESS_TOKEN_PENDING';
export const ACCESS_TOKEN_SUCCESS = 'ACCESS_TOKEN_SUCCESS';
export const ACCESS_TOKEN_FAILURE = 'ACCESS_TOKEN_FAILURE';

export const setAccessToken = accessToken => ({
  type: SET_ACCESS_TOKEN,
  accessToken,
});
