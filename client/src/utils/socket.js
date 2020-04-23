import io from "socket.io-client";
import axios from "axios";

class Socket {
  connect(token, setNewNotification) {
    this.socket = io("localhost:3001");

    // emit event with token from localStorage (will be verified in back end with JWT)
    this.socket.emit("store-user-id", { token });

    // receive notification from server
    this.socket.on("notification", (data) => {
      setNewNotification(data);
    });
  }

  async fetchNotifications() {
    const AuthStr = localStorage.token;
    try {
      const { data } = await axios.get("/api/notifications", {
        headers: { Authorization: `Bearer ${AuthStr}` },
      });
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}

export default new Socket();
