const SocketIo = require("socket.io");

const jwt = require("jsonwebtoken");
const { passportSecret } = require("../config/keys");

class Socket {
  constructor() {
    this.usersByUserId = {};
    this.usersBySocketId = {};
  }

  connect(server) {
    this.io = new SocketIo(server);
    this.io.on("connection", (socket) => {
      // eslint-disable-next-line no-console
      console.log(`A new client ${socket.id} has connected to server!`);

      // update user objects to map user id and socket ids
      socket.on("store-user-id", async (data) => {
        const { token } = data;
        const userId = jwt.verify(token, passportSecret).id;
        this.usersByUserId[userId] = socket.id;
        this.usersBySocketId[socket.id] = userId;
      });

      // on logout, make this socket disconnect
      socket.on("force-disconnect", () => {
        socket.disconnect();
      });

      // on disconnect, remove this socket from user objects
      socket.on("disconnect", () => {
        // eslint-disable-next-line no-console
        console.log(`Client ${socket.id} has disconnected from the server!`);
        const userId = this.usersBySocketId[socket.id];
        delete this.usersByUserId[userId];
        delete this.usersBySocketId[socket.id];
      });
    });
  }

  sendNotification(payload) {
    const { recipient } = payload;
    const recipientSocketId = this.usersByUserId[recipient];
    this.io.to(recipientSocketId).emit("send-data", {
      type: "notification",
      payload,
    });
  }

  updateProfileRating(reviewerId, score) {
    const reviewerSocketId = this.usersByUserId[reviewerId];
    this.io.to(reviewerSocketId).emit("send-data", {
      type: "new-rating",
      payload: score,
    });
  }

  addNewPost(request, message) {
    const { requesterId, reviewerId } = request;
    const requesterSocketId = this.usersByUserId[String(requesterId)];
    const reviewerSocketId = this.usersByUserId[String(reviewerId)];
    this.io.to(requesterSocketId).emit("send-data", {
      type: "new-post",
      payload: {
        requestId: request.id,
        message,
      },
    });
    this.io.to(reviewerSocketId).emit("send-data", {
      type: "new-post",
      payload: {
        requestId: request.id,
        message,
      },
    });
  };

}

module.exports = new Socket();
