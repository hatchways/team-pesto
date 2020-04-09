import React, { Fragment } from "react";
import { Switch } from "react-router-dom";

import Navbar from "components/Navbar";

const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <Switch></Switch>
    </Fragment>
  );
};

export default Home;
