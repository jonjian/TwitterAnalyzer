const io = require('socket.io-client');

const afterConnect = (socket) => {
  socket.on('connect_failed', () => {
    console.log('failed to connect to socket...');
  });
  // for all client-side listeners
  socket.on('fetchTweets', (data) => {
    console.log('fetching tweets..');
    // fetch all tweets related to them
    console.log('tweet return data: ', data);
    // set all sentiment values gathered from there to state
  });
};

const startConnection = new Promise((resolve, reject) => {

  // create websocket connection
  let socket = io.connect('http://127.0.0.1:3000');
  afterConnect(socket);

  // error handling, handled in afterConnect event listeners
  resolve(socket);
});


module.exports = {
  startConnection,
};
