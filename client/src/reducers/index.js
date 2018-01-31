import { combineReducers } from 'react-redux';

// import all reducer files to combine here
import tweets from './tweetsReducer';
import user from './userReducer';

export default combineReducers({
  tweets,
  user,
});
