import React, { Fragment, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UserContext from "context/UserContext";

import Navbar from "components/Navbar";

import Balance from "pages/Balance/index.js";

const Home = () => {
  const { user } = useContext(UserContext);
  console.log("homepage", user);

  // if (!user) {
  //   return <Redirect from="/" exact to="/login" />;
  // } else if (user && user.experience.length > 0) {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/balance" component={Balance} />
      </Switch>
    </Fragment>
  );
  // }
};

export default Home;
