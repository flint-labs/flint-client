import { combineReducers } from 'redux';
import accessToken from './accessToken';
import challenge from './challenge';

const reducer = combineReducers({
  accessToken, challenge,
});

export default reducer;
