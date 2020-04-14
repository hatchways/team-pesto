const socketIo = require("socket.io");

class Socket {
  connectServer(server) {
    this.io = new socketIo(server);
  }
  start() {
    this.io.on("connection", socket => {
      console.log(`A new client ${socket.id} has connected to server!`);
      this.io.sockets.in(socket.id).emit("test");
    });
  }
}

module.exports = new Socket();