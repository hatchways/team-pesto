const socketIo = require("socket.io");

class Socket {
  constructor() {
    this.usersByUserId = {};
    this.usersBySocketId = {};
  }

  connect(server) {
    this.io = new socketIo(server);
    this.io.on("connection", socket => {
      console.log(`A new client ${socket.id} has connected to server!`);

      // update user objects to map user id and socket ids
      socket.on("store-user-id", data => {
        const { userId } = data;
        this.usersByUserId[userId] = socket.id;
        this.usersBySocketId[socket.id] = userId;
      });

      // on logout, make this socket disconnect
      socket.on("force-disconnect", () => {
        socket.disconnect();
      });

      // on disconnect, remove this socket from user objects
      socket.on("disconnect", () => {
        console.log(`Client ${socket.id} has disconnected from the server!`);
        const userId = this.usersBySocketId[socket.id];
        delete this.usersByUserId[userId];
        delete this.usersBySocketId[socket.id];
      });
    });
  }

  // send notification to specific user (via user's unique room)
  sendNotification(userId, data) {
    this.io.to(userId).emit("notification", data);
  }
}

module.exports = new Socket();