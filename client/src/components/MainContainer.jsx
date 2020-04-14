import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `${theme.palette.secondary.light}`,
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: "2rem",
    width: "50vw",
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 20px 50px 1px #BBBBBB",
  },
}));

const MainContainer = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>{props.children}</Paper>
    </div>
  );
};

export default MainContainer;
