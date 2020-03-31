import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    background: `linear-gradient(to bottom, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    height: "75%",
    width: "50%"
  }
}));

function LoginSignupContainer(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>{props.children}</Paper>
    </div>
  );
}

export default LoginSignupContainer;