import { challengeAction } from '../actions';

const {
  SET_IS_ONGOING, SET_TITLE, SET_CHALLENGE_PERIOD, SET_START_AT, SET_REFEREE, SET_CHECKING_PERIOD,
  SET_AMOUNT, SET_RECEIPIENT, SET_SLOGAN, SET_CATEGORY,
} = challengeAction;

const date = new Date();
const TODAY = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());

const initialState = {
  category: '',
  isOnGoing: true,
  title: '',
  challengePeriod: '1',
  startAt: TODAY,
  referee: '',
  checkingPeriod: '1',
  amount: '',
  receipient: 1,
  slogan: '',
};

const challengeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CATEGORY:
    case SET_IS_ONGOING:
    case SET_TITLE:
    case SET_CHALLENGE_PERIOD:
    case SET_START_AT:
    case SET_REFEREE:
    case SET_CHECKING_PERIOD:
    case SET_AMOUNT:
    case SET_RECEIPIENT:
    case SET_SLOGAN:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default challengeReducer;
