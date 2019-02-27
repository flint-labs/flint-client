import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './src/reducers';

const logger = createLogger();
const store = createStore(reducer, applyMiddleware(logger));

export default store;
