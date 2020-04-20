import React, { useState, useEffect, useRef } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import UserContext from "./context/UserContext";
import theme from "themes/theme";
import Navbar from "components/Navbar";
import SignUp from "pages/SignUp";
import Login from "pages/Login";
import Balance from "pages/Balance";
import { remove } from "utils/storage";
import Onboarding from "pages/Onboarding";
import Requests from "pages/Requests/Requests";
import Profile from "pages/Profile";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const prevRedirect = useRef();
  // on mount
  useEffect(() => {
    prevRedirect.current = redirect;
    try {
      const AuthStr = localStorage.token;
      async function getUserData() {
        const { data } = await axios.get("/api/users/me", {
          headers: { Authorization: "Bearer " + AuthStr },
        });
        setUser(data);
      }

      if (localStorage.token && redirect === prevRedirect.current) {
        getUserData();
      }
    } catch (err) {
      console.error(err);
    }
  }, [redirect]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout: ({ socket }) => {
          setUser(null);
          setRedirect(!redirect);
          remove("token"); // TO DO: agree on a name for this token
          delete axios.defaults.headers.common["Authorization"];
          socket.emit("force-disconnect");
        },
      }}
    >
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            {/* Routes placed here are only available after logging in and having experience */}
            {user && user.experience.length > 0 && (
              <>
                <Navbar />
                <Switch>
                  <Route exact path="/" component={Profile} />
                  <Route exact path="/balance" component={Balance} />
                  <Route exact path="/balance" component={Balance} />
                  <Route exact path="/requests/:id" component={Requests} />
                  <Route exact path="/requests" component={Requests} />
                  {/* TODO: Future routes
                  <Route exact path="/upload" component={Upload} />*/}
                  <Redirect exact to="/" />
                </Switch>
              </>
            )}

            {/* Routes placed here are available after logging in and not having experience */}
            {user && user.experience.length === 0 && (
              <Switch>
                <Route
                  exact
                  path="/experience"
                  render={(props) => (
                    <Onboarding
                      {...props}
                      setRedirect={setRedirect}
                      redirect={redirect}
                    />
                  )}
                />
                <Redirect exact to="/experience" />
              </Switch>
            )}

            {/* Routes placed here are available if loggedout */}
            {!user && (
              <Switch>
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Redirect from="/" exact to="/login" />
              </Switch>
            )}
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
