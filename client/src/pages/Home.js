import React, { Fragment, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";

import Navbar from "../components/Navbar";

const Home = () => {
  const { user } = useContext(UserContext);

  // return user ? (
  //   <Redirect to="/login"/>
  // ) : (
  //   <Fragment>
  //     <Navbar />
  //     <Switch>
  //       {/* various Routes here */}
  //     </Switch>
  //   </Fragment>
  // );

  console.log(user)

  return <Navbar />

};

export default Home;