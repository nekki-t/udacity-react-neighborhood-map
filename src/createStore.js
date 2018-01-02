import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger'
import thunk from 'redux-thunk';
import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk, logger);

export default (initialState = {}) => (
  createStore(
    reducer,
    initialState,
    composeEnhancers(middleware)
  )
);