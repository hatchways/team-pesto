import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 15,
    marginBottom: 60,
    borderRadius: 20,
    color: "#FFFFFF",
    backgroundColor: `${theme.palette.secondary.main}`,
    width: "15ch",
    textTransform: "none",
  },
  grayButton: {
    marginTop: 15,
    marginBottom: 60,
    borderRadius: 20,
    color: "#FFFFFF",
    backgroundColor: "#AAAAAA",
    width: "15ch",
    textTransform: "none",
  },
  h1: {
    fontSize: "x-large",
    fontWeight: "bold",
  },
  balanceText: {
    color: "#7341DC",
    fontSize: "large",
    fontWeight: "bold",
  },
  h2: {
    fontSize: "medium",
    fontWeight: "bold",
  },
  input: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: 5,
    borderColor: "#EEEEEE",
    padding: 10,
  },
  subtract: {
    color: "#F44335",
    cursor: "pointer",
  },
  disabled: {
    color: "#AAAAAA",
    cursor: "pointer",
  },
  add: {
    color: `${theme.palette.primary.main}`,
    cursor: "pointer",
  },
  counter: {
    padding: "0px 20px 0px 20px",
  },
}));

export default useStyles;
