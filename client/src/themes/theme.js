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
      main: "#DF1B1B",
      dark: "#6E3ADB",
      green: "#43DDC1",
    },
  },
});

export default theme;
