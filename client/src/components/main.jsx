import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { startConnection } from '../socketHelpers/socketHelpers';

import Search from '../components/search.jsx';

@connect((store) => {
  return {
    tweets: store.tweets,
    user: store.user,
  }
})

export default class Main extends React.Component {

  componentDidMount() {
    // connects to socket when component loads
    startConnection();
  }

  render() {
    return (
      <div>
        <Search />
        {this.props.tweets}
      </div>
    );
  }
}
