import React, { useContext } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";

import useStyles from "./Balance.css";

const Checkout = ({
  refillAmount,
  setCheckoutPage,
}) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography className={classes.h1}>Checkout</Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography className={classes.h2}>Card number</Typography>
          </Grid>
          <Grid item>
            <TextField />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" justify="center">
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography className={classes.h2}>Expiry date</Typography>
              </Grid>
              <Grid item>
                <TextField />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography className={classes.h2}>CVC</Typography>
              </Grid>
              <Grid item>
                <TextField />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center">
        <Grid item>
          <Button className={classes.grayButton} onClick={() => setCheckoutPage(false)}>
            Go back
          </Button>
        </Grid>
        <Grid item>
          <Button className={classes.button} onClick={handleCheckout}>
            Pay ${refillAmount * 10}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Checkout;
