import React, { Fragment } from "react";
import { Switch } from "react-router-dom";

import Navbar from "components/Navbar";

import { Route } from "react-router-dom";
import Balance from "pages/Balance";

const Home = () => {
  return (
    <Fragment>
      <Navbar />
      {/* <Switch></Switch> */}

      <Switch>
        <Route path="/balance" component={Balance} />
      </Switch>

    </Fragment>
  );
};

export default Home;
