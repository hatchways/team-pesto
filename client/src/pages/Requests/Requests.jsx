import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import axios from "axios";

import useStyles from "pages/Requests/Requests.css";
import SingleView from "components/SingleView";
import Sidebar from "components/Sidebar";
import { getToken } from 'utils/storage';

const Requests = (props) => {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    try {
      const token = getToken();
      (async () => {
        const { data } = await axios.get("/api/reviews/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(data.usersRequests);
      })();      
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
