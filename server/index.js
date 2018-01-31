const app = require('./app');
const db = require('../db');

const PORT = process.env.port || 3000;

// socket.io set up
const socket = require('socket.io');

const server = app.listen(PORT, () => {
  console.log('Server listening on port 3000..');
});

// socket set up
let io = socket(server);

// on connection this function will fire
io.on('connection', (socket) => {
  console.log('A new user has connected to the socket..');
  // console.log(socket);

  // request and return tweets line
  socket.on('requestTweets', (data) => {
    // need to FIX to send back the tweet data from DB and incoming stream
    io.sockets.emit('fetchTweets', data);
  });
});
