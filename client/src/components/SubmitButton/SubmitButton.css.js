import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 20,
    color: "#FFFFFF",
    backgroundColor: `${theme.palette.secondary.main}`,
    width: "15ch",
    padding: 10,
  },
}));

export default useStyles;
