import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from '../socketHelpers/socketHelpers';
import Search from '../components/search.jsx';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    // connects to socket when component loads
    connect(this);
  }

  render() {
    return (
      <div>
        <Search />
      </div>
    );
  }
}
