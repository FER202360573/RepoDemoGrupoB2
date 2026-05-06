import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Memoria en RAM
const messages = [];
const onlineUsers = new Map(); // socketId -> username

io.on('connection', (socket) => {
  console.log(`Conectado: ${socket.id}`);

  // Registro de usuario
  socket.on('user_join', (username) => {
    onlineUsers.set(socket.id, username);
    socket.emit('chat_history', messages);

    // Notificar a todos que alguien entró
    io.emit('user_list', Array.from(onlineUsers.values()));
    io.emit('system_message', { text: `${username} se unió al chat`, time: new Date().toLocaleTimeString() });
  });

  // Mensaje nuevo
  socket.on('send_message', (data) => {
    const newMessage = {
      id: Date.now(),
      user: data.user,
      text: data.text,
      time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    };
    messages.push(newMessage);
    io.emit('receive_message', newMessage);
  });

  // Typing indicator
  socket.on('typing', (username) => {
    socket.broadcast.emit('user_typing', username);
  });

  socket.on('stop_typing', () => {
    socket.broadcast.emit('user_stop_typing');
  });

  socket.on('disconnect', () => {
    const username = onlineUsers.get(socket.id);
    onlineUsers.delete(socket.id);
    if (username) {
      io.emit('user_list', Array.from(onlineUsers.values()));
      io.emit('system_message', { text: `${username} salió del chat`, time: new Date().toLocaleTimeString() });
    }
    console.log(`Desconectado: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log('✅ Servidor corriendo en http://localhost:3001');
});