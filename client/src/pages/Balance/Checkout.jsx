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

// const ErrorMessage = ({ children }) => (
//   <div className="ErrorMessage" role="alert">
//     <svg width="16" height="16" viewBox="0 0 17 17">
//       <path
//         fill="#FFF"
//         d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
//       />
//       <path
//         fill="#6772e5"
//         d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
//       />
//     </svg>
//     {children}
//   </div>
// );

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

    const requestPaymentIntent = await axios.post(`/api/users/${user.id}/purchase`, { refillAmount });

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
      user.balance += refillAmount;
      setRefillAmount(1);
      await axios.put(`/api/users/${user.id}/add-credits`, { refillAmount });
    } else if (confirm.error) {
      setProcessing(false);
      setErrorSnackbar({ open: true, message: confirm.error })
    }
  };

  return !paymentSuccessful ? (
    <>
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
                      setErrorSnackbar({ open: true, message: e.error })
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
      <Portal>
        <Snackbar
          open={errorSnackbar.open}
          autoHideDuration={5000}
          onClose={() => setErrorSnackbar({ open: false, message: errorSnackbar.message })}
        >
          <p>TEST</p>
          {/* <Alert variant='filled' severity='error'>{errorSnackbar.message}</Alert> */}
        </Snackbar>
      </Portal>
    </>
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
