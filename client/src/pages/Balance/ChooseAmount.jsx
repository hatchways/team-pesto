import React, { useContext } from "react";
import {
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";

import useStyles from "./Balance.css";

const ChooseAmount = ({
  refillAmount,
  setRefillAmount,
  setCheckoutPage,
}) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const decrement = () => {
    if (refillAmount > 1) setRefillAmount(--refillAmount);
  };
  const increment = () => {
    setRefillAmount(++refillAmount);
  };
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography className={classes.h1}>Your balance:</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.balanceText}>
              {user && user.balance} credits
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography className={classes.h2}>Top Up:</Typography>
          </Grid>
          <Grid item>
            <Grid
              className={classes.input}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <IndeterminateCheckBoxIcon
                  className={
                    refillAmount !== 1 ? classes.subtract : classes.disabled
                  }
                  onClick={decrement}
                  disabled={refillAmount === 1}
                />
              </Grid>
              <Grid item>
                <Typography className={classes.counter}>{refillAmount}</Typography>
              </Grid>
              <Grid item>
                <AddBoxIcon className={classes.add} onClick={increment} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button className={classes.button} onClick={() => setCheckoutPage(true)}>
          Checkout
        </Button>
      </Grid>
    </Grid>
  );
}

export default ChooseAmount;