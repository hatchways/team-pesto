import React, { useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

import UserContext from "./context/UserContext";
import theme from "themes/theme";
import SignUp from "pages/SignUp";
import Login from "pages/Login";
import { remove } from "utils/storage";

import Home from "pages/Home";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    remove("token"); // TO DO: agree on a name for this token
  };

  // on mount
  // useEffect(() => {
  //   try {
  //     const AuthStr = localStorage.token;
  //     async function getUserData() {
  //       const { data } = await axios.get("/api/users/me", {
  //         headers: { Authorization: "Bearer " + AuthStr },
  //       });

  //       console.log(data);
  //       setUser(data);
  //     }

  //     getUserData();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
