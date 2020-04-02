import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
  },
  palette: {
    primary: {
      light: "#7889E0",
      main: "#6E3ADB",
      dark: "#6E3ADB",
    },
  },
});

export default theme;
