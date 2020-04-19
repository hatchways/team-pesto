import io from "socket.io-client";
import axios from "axios";

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

  async fetchNotifications(setNotifications) {
    const AuthStr = localStorage.token;
    try {
      const { data } = await axios.get("/api/notifications", {
        headers: { Authorization: "Bearer " + AuthStr },
      })
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  }
}

export default new Socket();