import React from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import SignUp from "./pages/Sign-up";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Route path="/sign-up" component={SignUp} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
