import io from "socket.io-client";
// import axios from "axios";

class Socket {
  async connect(token) {
    this.socket = io("localhost:3001");

    // emit event with token from localStorage (will be verified in back end with JWT)
    this.socket.emit("store-user-id", { token });

    // receive notification from server
    this.socket.on("notification", data => {
      console.log(`notification received: ${data}`);  // TO DO: figure out what happens next?
    });
  }
}

export default new Socket();