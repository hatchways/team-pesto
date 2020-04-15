const socketIo = require("socket.io");

class Socket {
  connect(server) {
    this.io = new socketIo(server);
    this.io.on("connection", socket => {
      console.log(`A new client ${socket.id} has connected to server!`);
      this.io.sockets.in(socket.id).emit("test");

      socket.on("pressed button", () => {
        console.log("you pressed the button!")
        setTimeout(() => this.io.sockets.in(socket.id).emit("5 seconds"), 5000);
      });

    });
  }
}

module.exports = new Socket();