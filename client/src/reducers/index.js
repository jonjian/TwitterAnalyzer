import { combineReducers } from 'redux';

// import all reducer files to combine here
import tweets from './tweetsReducers';
import user from './userReducers';
import socket from './socketReducers';

export default combineReducers({
  tweets,
  user,
  socket,
});
