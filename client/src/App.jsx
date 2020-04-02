import React, { useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
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
  };

  // on mount
  useEffect(() => {
  // useEffect(async () => {
    // setUser(await /* SOME CODE THAT CALLS THE BACK END TO GET USER */);

    // temporary mock user:
    setUser({
      id: 1,
      email: "mock_user@email.com",
      name: "Mock User",
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
          <Route path="/" component={Home} />
          {/* <Redirect to="/sign-up" />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/login" component={Login} /> */}
        </BrowserRouter>
      </MuiThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
