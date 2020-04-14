import io from "socket.io-client";

class Socket {
  constructor() {
    // this.socket = io();
    this.socket = io("localhost:3001");  // not sure why this has to be 3001
    this.socket.on("test", () => {
      console.log("TEST!!!");
    })
  }
}

export default new Socket();