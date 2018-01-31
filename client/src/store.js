import { applyMiddleware, createStore } from 'redux';

// import redux middleware
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

// import our reducers
import reducer from './reducers';

// set our middleware to a variable
const middleware = applyMiddleware(logger(), thunk, promise());

// export our createStore so that all components can reach store
export default createStore(reducer, middleware);
