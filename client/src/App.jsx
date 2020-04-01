import React, { useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import UserContext from "./context/UserContext";
import theme from "themes/theme";
import SignUp from "components/SignUp";
import Login from "components/Login";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // on mount
  useEffect(async () => {
    setUser(await /* SOME CODE THAT CALLS THE BACK END TO GET USER */);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
