import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Button,
  Grid,
  Typography,
  TextField,
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


const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_ELEMENT_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const stripePromise = loadStripe("pk_test_Y2tTju8cgfUZW4vozmYVG26J00yEwRHw7v");

const Checkout = ({
  refillAmount,
  setCheckoutPage,
}) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({ name: "" });

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) return;     // Stripe.js has not yet loaded.

    const requestPaymentIntent = await axios.post(`/api/users/${user.id}/purchase`, { refillAmount });
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    // if (error) {
    //   console.log('ERR:', error)
    //   return;
    // }
    // console.log('PAYMENT METHOD:', paymentMethod)

    const confirm = await stripe.confirmCardPayment(
      `${requestPaymentIntent.data.clientSecret}`,
      {
        payment_method: paymentMethod.id
      }
    );

    // console.log('CONFIRM:', confirm)
    
  };

  return (
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
                <Field
                  label="Name"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  autoComplete="name"
                  value={billingDetails.name}
                  onChange={e => {
                    setBillingDetails({ ...billingDetails, name: e.target.value });
                  }}
                />
              </fieldset>
              <fieldset className="FormGroup">
                {/* <CardField
                  onChange={e => {
                    setError(e.error);
                    setCardComplete(e.complete);
                  }}
                /> */}
                <div className="FormRow">
                  <CardElement options={CARD_ELEMENT_OPTIONS} onChange={e => {
                    setError(e.error);
                    setCardComplete(e.complete);
                  }} />
                </div>
              </fieldset>
              {error && <ErrorMessage>{error.message}</ErrorMessage>}
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
                  // disabled={processing}
                >
                  { error ? "Try again" : processing ? "Processing..." : `Pay $${refillAmount * 10}` }
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

// To use Element components, we need to wrap the component in an Elements provider
const WrappedCheckout = ({
  refillAmount,
  setCheckoutPage,
}) => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout refillAmount={refillAmount} setCheckoutPage={setCheckoutPage} />
    </Elements>
  )
};

// export default Checkout;
export default WrappedCheckout;
