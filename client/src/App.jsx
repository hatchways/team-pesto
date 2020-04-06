import React, { useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import axios from "axios";

import UserContext from "./context/UserContext";
import theme from "themes/theme";
import SignUp from "components/SignUp";
import Login from "components/Login";

import Home from "pages/Home";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");   // TO DO: agree on a name for this token
  };

  // on mount
  useEffect(() => {
  // TO DO: remove hardcoded user, and write async func that invokes setUser(await axios.get("/users/me"))
    setUser({
      id: 1,
      email: "mock_user@email.com",
      name: "Mock User",
      image: "mock-user.png",
    });
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      logout,
    }}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Redirect to="/sign-up" />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/login" component={Login} />
        </BrowserRouter>
      </MuiThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
