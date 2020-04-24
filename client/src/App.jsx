import React, { useState, useEffect, useRef } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import UserContext from "context/UserContext";
import AppSnackbarContext from 'context/AppSnackbarContext';
import theme from "themes/theme";
import SignUp from "pages/SignUp";
import Login from "pages/Login";
import Balance from "pages/Balance";
import Onboarding from "pages/Onboarding";
import Requests from "pages/Requests";
import Reviews from 'pages/Reviews';
import Profile from "pages/Profile";
import Navbar from "components/Navbar";
import AppSnackbar from 'components/AppSnackbar';
import { remove } from "utils/storage";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [snackbar, setSnackbar] = 
    useState({ open: false, severity: '', message: '' });

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
      <AppSnackbarContext.Provider value={{ snackbar, setSnackbar }}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <CssBaseline />

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
                    <Route exact path="/reviews/:id" component={Reviews} />
                    <Route exact path="/reviews" component={Reviews} />
                    {/* TODO: Future routes
                    <Route exact path="/upload" component={Upload} />*/}
                    {/* <Redirect exact to="/" /> */}
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
                  <Route exact path="/" component={Profile} />
                  <Route exact path="/balance" component={Balance} />
                  <Route exact path="/balance" component={Balance} />
                  <Route exact path="/requests/:id" component={Requests} />
                  <Route exact path="/requests" component={Requests} />
                  <Route exact path="/profile/:id" component={Profile} />
                  {/* TODO: Future routes
                  <Route exact path="/upload" component={Upload} />*/}
                  <Redirect exact to="/" />
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

            <AppSnackbar />
          </BrowserRouter>
        </MuiThemeProvider>
      </AppSnackbarContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
