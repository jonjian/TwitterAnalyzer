const io = require('socket.io-client');
// A sort of redux:
// so we can make an instance of App on connect and make changes to it from this file
let app = null;

const afterConnect = (socket) => {
  // for all client-side listeners
  socket.on('fetchTweets', (data) => {
    console.log('fetching tweets..');
    // fetch all tweets related to them
    console.log('tweet return data: ', data);
    // set all sentiment values gathered from there to state
  });
};

const connect = (component) => {
  // create websocket connection
  let socket = io.connect('http://127.0.0.1:3000');

  // set argument app to var app, so we can modify things in app
  app = component;
  // add listeners
  afterConnect(socket);
};


module.exports = {
  connect,
};
