import React, { useState, useContext } from "react";
import axios from "axios";
import MainContainer from "components/MainContainer";
import GridTemplateContainer from "components/GridTemplateContainer";
import UserContext from "context/UserContext";

import { StripeProvider, Elements } from "react-stripe-elements";

// import useStyles from "./Balance.css";

import ChooseAmount from "./ChooseAmount";
import Checkout from "./Checkout";

const Balance = () => {
  // const classes = useStyles();
  const { user } = useContext(UserContext);

  let [refillAmount, setRefillAmount] = useState(1);
  const [checkoutPage, setCheckoutPage] = useState(false);

  return (
    <MainContainer>
      <GridTemplateContainer>
        <StripeProvider apiKey="pk_test_Y2tTju8cgfUZW4vozmYVG26J00yEwRHw7v">
          {!checkoutPage ? (
            <ChooseAmount
              refillAmount={refillAmount}
              setRefillAmount={setRefillAmount}
              setCheckoutPage={setCheckoutPage}
            />
          ) : (
            <Elements>
              <Checkout
                refillAmount={refillAmount}
                setCheckoutPage={setCheckoutPage}
              />
            </Elements>
          )}
        </StripeProvider>
      </GridTemplateContainer>
    </MainContainer>
  );
};

export default Balance;