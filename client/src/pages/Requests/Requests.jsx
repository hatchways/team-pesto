import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Paper, Card, Typography } from "@material-ui/core";
import useStyles from "pages/Requests/Requests.css";
import axios from "axios";
import SingleView from "components/SingleView/SingleView";
import Sidebar from "components/Sidebar";

import formatDate from "utils/formatDate";

const Requests = (props) => {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    try {
      const AuthStr = localStorage.token;
      const callRequests = async () => {
        const { data } = await axios.get("/api/reviews/requests", {
          headers: { Authorization: "Bearer " + AuthStr },
        });
        data.usersRequests.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRequests(data.usersRequests);
      };

      callRequests();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const borderColor = (id) => {
    const requestId = props.match.params.id;
    return requestId === id ? { borderColor: "#43DDC1" } : null;
  };

  return (
    <div className={classes.MainWrapper}>
      <div className={classes.contentWrapper}>
        <Sidebar requests={requests} borderColor={borderColor} />

        <Switch>
          {requests.map((request) => (
            <Route
              key={request["_id"]}
              exact
              path={`/requests/${request["_id"]}`}
              render={() => <SingleView singleRequestView={request} />}
            />
          ))}
          {requests.length > 0 ? (
            <Route
              exact
              path={`/requests`}
              render={() => <Redirect to={`/requests/${requests[0]["_id"]}`} />}
            />
          ) : null}
        </Switch>
      </div>
    </div>
  );
};

export default Requests;
