import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Grid,
  Typography,
  Portal,
  Snackbar,
} from "@material-ui/core";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Alert } from '@material-ui/lab';
import { loadStripe } from "@stripe/stripe-js";

import useStyles from "./Balance.css";
import UserContext from "context/UserContext";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const stripePromise = loadStripe("pk_test_Y2tTju8cgfUZW4vozmYVG26J00yEwRHw7v");

const Checkout = ({
  refillAmount,
  setRefillAmount,
  setCheckoutPage,
}) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();
  const [errorSnackbar, setErrorSnackbar] = useState({ open: false, message: '' });
  const [successSnackbar, setSuccessSnackbar] = useState({ open: false, message: '' });
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({ name: "" });
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) return;     // Stripe.js has not yet loaded.
    if (!billingDetails.name) {
      document.getElementById("name").focus();
      setErrorSnackbar({ open: true, message: "Please enter your name" })
      return;
    }
    if (errorSnackbar.open || !cardComplete) {
      elements.getElement("card").focus();
      setErrorSnackbar({ open: true, message: "Invalid card number" })
      return;
    }
    
    setProcessing(true);

    const requestPaymentIntent = await axios.post(`/api/users/purchase`, { refillAmount });

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    const confirm = await stripe.confirmCardPayment(
      `${requestPaymentIntent.data.clientSecret}`,
      {
        payment_method: payload.paymentMethod.id
      }
    );

    if (confirm.paymentIntent.status === "succeeded") {
      setProcessing(false);
      setPaymentSuccessful(true);
      setSuccessSnackbar({ open: true, message: "Payment successful!" });
      user.balance += refillAmount;
      setRefillAmount(1);
      await axios.put(`/api/users/${user.id}/add-credits`, { refillAmount });
    } else if (confirm.error) {
      setProcessing(false);
      setErrorSnackbar({ open: true, message: confirm.error })
    }
  };

  return (
    <>
      {!paymentSuccessful ? (
        <Grid container direction="column" alignItems="center">
          <Grid
            item
            container
            xs={12}
            direction="column"
            className={classes.stripePayment}
          >
            <form className="Form" onSubmit={handleSubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <fieldset className="FormGroup">
                    <div className="FormRow">
                      <input
                        className="FormRowInput"
                        id="name"
                        type="text"
                        placeholder="Name on credit card"
                        required
                        autoComplete="name"
                        value={billingDetails.name}
                        onChange={e => setBillingDetails({ ...billingDetails, name: e.target.value })}
                      />
                    </div>
                  </fieldset>
                  <fieldset className="FormGroup">
                    <div className="FormRow">
                      <CardElement options={CARD_ELEMENT_OPTIONS} onChange={e => {
                        setCardComplete(e.complete);
                      }} />
                    </div>
                  </fieldset>
                </Grid>
                <Grid container item direction="row">
                  <Grid item xs={6}>
                    <Button
                      className={classes.button}
                      color="primary"
                      variant="contained"
                      onClick={() => setCheckoutPage(false)}
                    >
                      Edit cart
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      className={classes.button}
                      color="primary"
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={processing}
                    >
                      { errorSnackbar.open ? "Try again" : processing ? "Processing..." : `Pay $${refillAmount * 10}` }
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column" spacing={6}>
          <Grid item xs={12}>
            <Typography className={classes.text}>Payment Complete</Typography>
          </Grid>
          <Grid container item direction="row" xs={12} justify="center">
            <Grid item xs={6}>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                onClick={() => {
                  setPaymentSuccessful(false);
                  setCheckoutPage(false);
                }}
              >
                View Balance
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Link to="/code-upload" className={classes.link}>
                <Button
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  onClick={() => setPaymentSuccessful(false)}
                >
                  Upload Code
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Portal>
        <Snackbar
          open={errorSnackbar.open}
          autoHideDuration={5000}
          onClose={() => setErrorSnackbar({ open: false, message: errorSnackbar.message })}
        >
          <Alert variant="filled" severity="error">{errorSnackbar.message}</Alert>
        </Snackbar>
      </Portal>
      <Portal>
        <Snackbar
          open={successSnackbar.open}
          autoHideDuration={5000}
          onClose={() => setSuccessSnackbar({ open: false, message: "" })}
        >
          <Alert variant="filled" severity="success">{successSnackbar.message}</Alert>
        </Snackbar>
      </Portal>
    </>
  );
};

// to use Element components, we need to wrap the component in an Elements provider
const WrappedCheckout = ({
  refillAmount,
  setRefillAmount,
  setCheckoutPage,
}) => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout
        refillAmount={refillAmount}
        setRefillAmount={setRefillAmount}
        setCheckoutPage={setCheckoutPage}
      />
    </Elements>
  )
};

export default WrappedCheckout;
