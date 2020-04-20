import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Paper, Card, Typography } from "@material-ui/core";
import useStyles from "pages/Requests/Requests.css";
import axios from "axios";
import SingleView from "components/SingleView/SingleView";

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
        <Paper className={classes.sideBar}>
          <Typography variant="h3">
            Requests{" "}
            <span className={classes.quantity}>({requests.length})</span>
          </Typography>

          <div className={classes.cardWrapper}>
            {requests.map((request) => (
              <Link className={classes.link} to={`/requests/${request["_id"]}`}>
                <Card
                  key={request["_id"]}
                  className={classes.card}
                  data-id={request["_id"]}
                  variant="outlined"
                  style={borderColor(request["_id"])}
                >
                  <Typography className={classes.title}>
                    {request.title}
                  </Typography>
                  <Typography className={classes.date}>
                    {formatDate(request.date)}
                  </Typography>
                </Card>
              </Link>
            ))}
          </div>
        </Paper>

        <Switch>
          {requests.map((request) => (
            <Route
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
          }
        </Switch>
      </div>
    </div>
  );
};

export default Requests;
