import io from "socket.io-client";

class Socket {
  connect(userId) {
    this.socket = io("localhost:3001");
    this.socket.emit("store-user-id", { userId })
  }
}

export default new Socket();