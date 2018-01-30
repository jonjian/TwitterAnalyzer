import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    // connects to socket when component loads
    let socket = io.connect("http://localhost:3000");
  }

  render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}
