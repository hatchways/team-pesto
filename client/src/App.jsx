import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import theme from "themes/theme";
import SignUp from "components/SignUp";
import Login from "components/Login";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={SignUp} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
