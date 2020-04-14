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
      dark: "#501CBD",
    },
    secondary: {
      light: "#ECF0FA",
      main: "#43DDC1",
      lightGray: "#bdbdbd",
    },
  },
});

export default theme;
