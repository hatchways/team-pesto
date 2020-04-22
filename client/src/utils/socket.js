import io from "socket.io-client";
import axios from "axios";

class Socket {
  constructor () {
    this.subscribers = {};
  }

  connect(token) {
    this.socket = io("localhost:3001");

    // emit event with token from localStorage (will be verified in back end with JWT)
    this.socket.emit("store-user-id", { token });

    // place a socket listener that listens for all "send-data" events, and triggers subscriber
    // components to invoke their callback functions. `data` is an object with keys 'type' and
    // 'payload'
    this.socket.on("send-data", data => {
      for (const component in this.subscribers) {
        try {
          const callback = this.subscribers[component];
          callback(data);
        } catch (err) {
          console.error(err);
        }
      }
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

  subscribe(component, callback) {
    this.subscribers[component] = callback;
  }

  unsubscribe(component) {
    delete this.subscribers[component];
  }

}

export default new Socket();