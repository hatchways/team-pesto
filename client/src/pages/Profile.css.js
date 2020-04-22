import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  MainWrapper: {
    display: "grid",
    gridTemplateRows: "repeat(3, 20%) 1fr",
    justifyItems: "center",
    width: "100%",
    height: "100%",
  },
  userAvatar: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    display: "flex",
    justifyContent: "center",
  },
  gridRow1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  gridRow2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
    alignItems: "center",
    width: "100%",
  },
  gridRow3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
    alignItems: "center",
    width: "100%",
  },
  gridRow4: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
    alignItems: "center",
    width: "100%",
  },
}));

export default useStyles;
