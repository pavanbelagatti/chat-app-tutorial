const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  
  socket.on('message', (message) => {
    console.log('Received message:', message);
    io.emit('message', message);
  });
});

http.listen(3001, () => {
  console.log('Server started on port 3001');
});
