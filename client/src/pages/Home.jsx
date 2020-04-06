import React, { Fragment, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UserContext from "context/UserContext";

import Navbar from "components/Navbar";

import Balance from "pages/Balance";

const Home = () => {
  const { user } = useContext(UserContext);
  return user && false ? (
    <Redirect to="/login"/>
  ) : (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/balance" component={Balance} />
      </Switch>
    </Fragment>
  );
};

export default Home;
