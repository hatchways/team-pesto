import io from "socket.io-client";
import axios from "axios";

class Socket {
  async connect(token) {
    this.socket = io("localhost:3001");

    // emit event
    const { data } = await axios.get("/api/users/me", {
      headers: { Authorization: "Bearer " + token },
    });
    this.socket.emit("store-user-id", { userId: data.id });

    // receive notification from server
    this.socket.on("notification", data => {
      console.log(`notification received: ${data}`);  // TO DO: figure out what happens next?
    });
  }
}

export default new Socket();