import React, { useState, useContext } from "react";
import axios from "axios";
import {
  makeStyles,
  Button,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
import MainContainer from "components/MainContainer";
import GridTemplateContainer from "components/GridTemplateContainer";
import Navbar from "components/Navbar";
import UserContext from "context/UserContext";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";

import useStyles from "./Balance.css";

const Balance = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  let [refillAmount, setRefillAmount] = useState(1);
  const [checkoutPage, setCheckoutPage] = useState(false);

  const decrement = () => {
    if (refillAmount > 1) setRefillAmount(--refillAmount);
  };

  const increment = () => {
    setRefillAmount(++refillAmount);
  };

  const handleCheckout = () => {
    setCheckoutPage(true);
  };

  const handleGoBack = () => {
    setCheckoutPage(false);
  };

  return (
    <MainContainer>
      <GridTemplateContainer>
        <Navbar />
        {!checkoutPage ? (
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
              >
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
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
              >
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
                          refillAmount !== 1
                            ? classes.subtract
                            : classes.disabled
                        }
                        onClick={decrement}
                        disabled={refillAmount === 1}
                      />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.counter}>
                        {refillAmount}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <AddBoxIcon className={classes.add} onClick={increment} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button className={classes.button} onClick={handleCheckout}>
                Checkout
              </Button>
            </Grid>
          </Grid>
        ) : (
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
                      <Typography className={classes.h2}>
                        Expiry date
                      </Typography>
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
                <Button className={classes.grayButton} onClick={handleGoBack}>
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
        )}
      </GridTemplateContainer>
    </MainContainer>
  );
};

export default Balance;
