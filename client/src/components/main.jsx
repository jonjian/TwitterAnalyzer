import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { startConnection } from '../socketHelpers/socketHelpers';

import Search from '../components/search.jsx';

import setSocket from "../actions/socketActions";

@connect((store) => {
  return {
    tweets: store.tweets,
    user: store.user,
    socket: store.socket,
  }
})

export default class Main extends React.Component {

  componentDidMount() {
    // connects to socket when component loads
    startConnection()
      .then((socket) => {
        this.props.dispatch(setSocket(socket));
      })
  }

  render() {
    console.log(this.props.socket);
    return (
      <div>
        <Search />
      </div>
    );
  }
}
