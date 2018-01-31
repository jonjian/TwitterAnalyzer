const io = require('socket.io-client');

const afterConnect = (socket) => {
  // for all client-side listeners
  socket.on('fetchTweets', (data) => {
    console.log('fetching tweets..');
    // fetch all tweets related to them
    console.log('tweet return data: ', data);
    // set all sentiment values gathered from there to state
  });
};

const startConnection = () => {
  // create websocket connection
  let socket = io.connect('http://127.0.0.1:3000');

  // add listeners
  afterConnect(socket);
};


module.exports = {
  startConnection,
};
