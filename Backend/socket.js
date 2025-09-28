function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // Join a room per user or global
    socket.on('join', (userId) => {
      socket.join(userId);
    });

    // New alert
    socket.on('alert:new', (data) => {
      io.emit('alert:new', data); // broadcast to all helpers
    });

    // Location updates
    socket.on('alert:update', (data) => {
      io.emit('alert:update', data);
    });

    // Alert ended
    socket.on('alert:end', (data) => {
      io.emit('alert:end', data);
    });

    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
}

module.exports = socketHandler;
