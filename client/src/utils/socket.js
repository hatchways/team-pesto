import io from "socket.io-client";
import axios from "axios";

class Socket {
  connect(token, setNewScore, setNewNotification) {
    this.socket = io("localhost:3001");

    // emit event with token from localStorage (will be verified in back end with JWT)
    this.socket.emit("store-user-id", { token });

    // TO DO: RETHINK THE SCALABILITY OF THIS METHOD. PROB CAN'T KEEP
    // ADDING MORE set___ METHODS INTO THIS CONNECT METHOD?
    // receive notification from server
    this.socket.on("notification", data => {
      setNewNotification(data);
    });

    // TO DO: FIGURE OUT HOW TO UPDATE USER RATING
    // receive new rating from server
    this.socket.on("new-rating", score => {
      console.log("SCORE:", typeof score, score)
      setNewScore({ score });
    });
  }

  async fetchNotifications() {
    const AuthStr = localStorage.token;
    try {
      const { data } = await axios.get("/api/notifications", {
        headers: { Authorization: "Bearer " + AuthStr },
      })
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}

export default new Socket();