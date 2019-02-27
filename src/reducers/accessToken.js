import {
  ACCESS_TOKEN_FAILURE, ACCESS_TOKEN_PENDING,
  ACCESS_TOKEN_SUCCESS, SET_ACCESS_TOKEN,
} from '../actions/accessToken';

const initialState = {
  [ACCESS_TOKEN_PENDING]: false,
  [ACCESS_TOKEN_SUCCESS]: false,
  [ACCESS_TOKEN_FAILURE]: false,
  accessToken: null,
};

const accessTokenReducer = (state = initialState, action) => {
  const { accessToken, type } = action;
  switch (type) {
    case ACCESS_TOKEN_PENDING:
      return {
        ...state,
        [ACCESS_TOKEN_PENDING]: true,
        [ACCESS_TOKEN_SUCCESS]: false,
        [ACCESS_TOKEN_FAILURE]: false,
      };
    case ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        [ACCESS_TOKEN_PENDING]: false,
        [ACCESS_TOKEN_SUCCESS]: true,
        [ACCESS_TOKEN_FAILURE]: false,
      };
    case ACCESS_TOKEN_FAILURE:
      return {
        ...state,
        [ACCESS_TOKEN_PENDING]: false,
        [ACCESS_TOKEN_SUCCESS]: false,
        [ACCESS_TOKEN_FAILURE]: true,
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state, accessToken,
      };
    default:
      return state;
  }
};

export default accessTokenReducer;
