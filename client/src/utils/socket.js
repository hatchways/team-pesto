import io from "socket.io-client";

class Socket {
  constructor() {
    // this.socket = io();
    this.socket = io("localhost:3001");  // not sure why this has to be 3001
  }
}

const socket = new Socket();
export default socket;