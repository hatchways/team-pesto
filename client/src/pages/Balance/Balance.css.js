import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 15,
    marginBottom: 15,
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
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40ch",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  stripe: {
    width: "100%",
  },
  buttonSet: {
    width: "75%",
    display: "flex",
    justifyContent: "space-between",
  },
  buttonLink: {
    textDecoration: "none",
  },
}));

export default useStyles;
