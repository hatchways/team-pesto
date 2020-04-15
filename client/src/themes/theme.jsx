import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Nunito Sans", "Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
    h3: {
      margin: 0,
      fontWeight: "bold",
      fontSize: "1.4rem",
    },
    h5: {
      margin: 0,
      fontWeight: "bold",
      fontSize: "1rem",
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
