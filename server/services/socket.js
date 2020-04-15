const socketIo = require("socket.io");

class Socket {
  constructor() {
    this.users = {};
  }
  connect(server) {
    this.io = new socketIo(server);
    this.io.on("connection", socket => {
      console.log(`A new client ${socket.id} has connected to server!`);
      socket.on("store-user-id", data => {
        const { userId } = data;
        this.users[userId] = socket.id;
        console.log('USERS:', this.users);
      })
    });
  }
}

module.exports = new Socket();