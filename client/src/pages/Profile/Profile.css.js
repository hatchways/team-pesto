import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  MainWrapper: {
    display: "grid",
    gridTemplateRows: "repeat(3, 1fr) 1fr",
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
    textAlign: "center",
  },
  gridRow1: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
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
  inputField: {
    "& .MuiInputBase-input": {
      textAlign: "center",
    },
  },
  editHeader: {
    height: "100%",
    textAlign: "right",
  },
  editIcon: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default useStyles;
