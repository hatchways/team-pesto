import React, { useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import UserContext from "./context/UserContext";
import theme from "themes/theme";
import SignUp from "pages/SignUp";
import Login from "pages/Login";
import Balance from "pages/Balance";
import { remove } from "utils/storage";

import Home from "pages/Home";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    remove("token"); // TO DO: agree on a name for this token
    delete axios.defaults.headers.common["Authorization"];
  };

  // on mount
  useEffect(() => {
    try {
      const AuthStr = localStorage.token;
      async function getUserData() {
        const { data } = await axios.get("/api/users/me", {
          headers: { Authorization: "Bearer " + AuthStr },
        });

        setUser(data);
      }

      if (localStorage.token) {
        getUserData();
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

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

            <Route path="/" component={Home} />

            {/* Routes placed here are only available after logging in and having experience */}
            {/* {user && user.experience.length > 0 && (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/balance" component={Balance} />
                {/x* TODO: Future routes
                 <Route exact path="/reviews" component={Reviews} />
                <Route exact path="/upload" component={Upload} />
                <Route exact path="/balance" component={Balance} /> *x/}
                <Redirect exact to="/" />
              </Switch>
            )} */}

            {/* Routes placed here are available after logging in and not having experience */}
            {/* {user && user.experience.length === 0 && (
              <Switch>
                {
                  // TODO create experience route in seperate PR
                }
                <Redirect exact to="/experience" />
              </Switch>
            )} */}

            {/* Routes placed here are available to all visitors */}
            {/* <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Redirect from="/" exact to="/login" /> */}

          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
