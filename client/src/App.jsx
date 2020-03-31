import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import theme from "./themes/theme";
import SignUp from "./pages/Sign-up";
import Login from "./pages/Login";
import TestLanding from "./pages/TestLanding.js";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Redirect to="/sign-up" />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/" component={TestLanding} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
