import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

function GridTemplateContainer(props) {
  const classes = useStyles(props);
  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid item xs={12}>
        <Grid container justify="center">
          {props.children}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GridTemplateContainer;
