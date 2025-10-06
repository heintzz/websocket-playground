const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const port = 3000;
const app = express();

const db = {
  rooms: {},
};

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
  // console.log('client is connected:', socket.id);

  socket.on('message', (message) => {
    // console.log('message from client:', message);
  });

  socket.emit('counter_change', counter);
  socket.emit('room_list', db.rooms);

  socket.on('increment_counter', () => {
    counter++;
    io.emit('counter_change', counter);
  });

  socket.on('send_message', (data) => {
    io.emit('new_message', data);
  });

  socket.on('send_message2', (data) => {
    io.to(data.roomId).emit('new_message2', data);
  });

  socket.on('create_room', (data) => {
    const { creatorId, roomName, isPrivate, password } = data;
    const roomId = Math.random().toString(36).slice(2, 6);

    const newRoom = {
      id: roomId,
      name: roomName,
      isPrivate: isPrivate,
      password: password,
      members: new Set([creatorId]),
      messages: [],
    };
    db.rooms[roomId] = newRoom;

    io.emit('new_room', newRoom);
  });

  socket.on('join_room', (data) => {
    const newUserId = data.userId;
    const room = db.rooms[data.roomId];

    if (!room.members.has(newUserId)) {
      room.members.add(newUserId);
    }

    socket.join(data.roomId);
  });

  socket.on('disconnect', () => {
    console.log('client is disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
