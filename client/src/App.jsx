import React from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

<<<<<<< HEAD:client/src/App.js
import { theme } from "./themes/theme";
import SignUp from "./pages/Sign-up";
=======
import theme from "./themes/theme";
import LandingPage from "./pages/Landing";
>>>>>>> ec03a13e7d79d2da974a07fdeb295069a6df55ff:client/src/App.jsx

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
