import io from "socket.io-client";

class Socket {
  connect() {
    this.socket = io("localhost:3001");
    this.socket.on("test", () => {
      console.log("TEST!!!");
    })
  }
}

export default new Socket();