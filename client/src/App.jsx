import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import theme from "./themes/theme";

import TestLanding from "./pages/TestLanding.js";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <Route path="/" component={LandingPage} /> */}
        <Route path="/" component={TestLanding} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
