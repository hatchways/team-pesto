import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Grid,
  Typography,
  Portal,
  Snackbar,
  TextField,
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

import GridTemplateContainer from "components/GridTemplateContainer";

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
  const [snackbar, setSnackbar] = useState({ open: false, severity: "", message: "" });
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({ name: "" });
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) return;     // Stripe.js has not yet loaded.
    if (!billingDetails.name) {
      document.getElementById("name").focus();
      setSnackbar({ open: true, severity: "error", message: "Please enter your name" });
      return;
    }
    if (!cardComplete || snackbar.open && snackbar.severity === "error") {
      elements.getElement("card").focus();
      setSnackbar({ open: true, severity: "error", message: "Invalid card number" });
      return;
    }
    
    setProcessing(true);

    const requestPaymentIntent = await axios.post(`/api/users/purchase`, { refillAmount });

    const { paymentIntentId, clientSecret } = requestPaymentIntent.data;

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    const confirm = await stripe.confirmCardPayment(
      `${clientSecret}`,
      {
        payment_method: payload.paymentMethod.id
      }
    );

    if (confirm.paymentIntent.status === "succeeded") {
      setProcessing(false);
      setPaymentSuccessful(true);
      setSnackbar({ open: true, severity: "success", message: "Payment successful!" });
      user.balance += refillAmount;
      setRefillAmount(1);
      await axios.put(`/api/users/${user.id}/add-credits`, { paymentIntentId });
    } else if (confirm.error) {
      setProcessing(false);
      setSnackbar({ open: true, severity: "error", message: confirm.error });
    }
  };

  return (
    <>
      {!paymentSuccessful ? (
        <GridTemplateContainer>
          <form className={classes.form} onSubmit={handleSubmit}>
            
            <Typography className={classes.h1}>Checkout</Typography>
            
            <TextField
              label="Name"
              className="FormRowInput"
              id="name"
              type="text"
              placeholder="Name on credit card"
              required
              autoComplete="name"
              value={billingDetails.name}
              onChange={e => setBillingDetails({ ...billingDetails, name: e.target.value })}
            />
            
            <div className={classes.stripe}>
              <CardElement options={CARD_ELEMENT_OPTIONS} onChange={e => {
                setCardComplete(e.complete);
              }} />
            </div>

            <div className={classes.buttonSet}>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                onClick={() => setCheckoutPage(false)}
              >
                Edit cart
              </Button>
              <Button
                className={classes.button}
                color="secondary"
                variant="contained"
                onClick={handleSubmit}
                disabled={processing}
              >
                { snackbar.open && snackbar.severity === "error" ? "Try again" : processing ? "Processing..." : `Pay $${refillAmount * 10}` }
              </Button>
            </div>
            
          </form>
        </GridTemplateContainer>
      ) : (
        <GridTemplateContainer>
        <form className={classes.form}>
          <Typography className={classes.h1}>Payment successful!</Typography>
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
          <Link to="/code-upload" className={classes.buttonLink}>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={() => setPaymentSuccessful(false)}
            >
              Upload Code
            </Button>
          </Link>
        </form>
        </GridTemplateContainer>
      )}
      <Portal>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert variant="filled" severity={snackbar.severity}>{snackbar.message}</Alert>
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
