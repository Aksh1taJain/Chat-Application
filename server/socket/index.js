import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const onlineUsers = new Map();

export const initSocket = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) { next(new Error('Unauthorized')); }
  });

  io.on('connection', async (socket) => {
    onlineUsers.set(socket.user._id.toString(), socket.id);
    await User.findByIdAndUpdate(socket.user._id, { isOnline: true });
    io.emit('online-users', [...onlineUsers.keys()]);

    socket.on('join-chat', (chatId) => socket.join(chatId));
    socket.on('typing', ({ chatId, user }) => socket.to(chatId).emit('typing', { chatId, user }));
    socket.on('stop-typing', ({ chatId }) => socket.to(chatId).emit('stop-typing', { chatId }));
    socket.on('new-message', (message) => socket.to(message.chat).emit('message-received', message));
    socket.on('messages-read', ({ chatId, userId }) => socket.to(chatId).emit('read-receipt-updated', { chatId, userId }));

    socket.on('disconnect', async () => {
      onlineUsers.delete(socket.user._id.toString());
      await User.findByIdAndUpdate(socket.user._id, { isOnline: false, lastSeen: new Date() });
      io.emit('online-users', [...onlineUsers.keys()]);
    });
  });
};
