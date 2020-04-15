import React, { useState } from "react";
import MainContainer from "components/MainContainer";
import GridTemplateContainer from "components/GridTemplateContainer";

import ChooseAmount from "./ChooseAmount";
import Checkout from "./Checkout";

const Balance = () => {
  let [refillAmount, setRefillAmount] = useState(1);
  const [checkoutPage, setCheckoutPage] = useState(false);
  return (
    <MainContainer>
      <GridTemplateContainer>
        {!checkoutPage ? (
          <ChooseAmount
            refillAmount={refillAmount}
            setRefillAmount={setRefillAmount}
            setCheckoutPage={setCheckoutPage}
          />
        ) : (
          <Checkout
            refillAmount={refillAmount}
            setRefillAmount={setRefillAmount}
            setCheckoutPage={setCheckoutPage}
          />
        )}
      </GridTemplateContainer>
    </MainContainer>
  );
};

export default Balance;
