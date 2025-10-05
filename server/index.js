const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const port = 3000;
const app = express();

app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// adding another control to our app such as websocket or maybe https
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:5500',
  },
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

let counter = 0;

io.on('connection', (socket) => {
  console.log('client is connected:', socket.id);

  socket.on('message', (message) => {
    console.log('message from client:', message);
  });

  socket.emit('counter_change', counter); // send initial value

  socket.on('increment_counter', () => {
    counter++;
    io.emit('counter_change', counter); // broadcast to all clients
  });

  socket.on('send_message', (data) => {
    io.emit('new_message', data);
  });

  socket.on('disconnect', () => {
    console.log('client is disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
