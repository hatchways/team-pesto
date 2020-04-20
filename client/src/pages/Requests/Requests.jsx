import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Paper, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import SingleView from "components/SingleView/SingleView";

import formatDate from "utils/formatDate";

const useStyles = makeStyles((theme) => ({
  MainWrapper: {
    display: "grid",
    gridTemplateRows: "64px 1fr",
    backgroundColor: `${theme.palette.secondary.light}`,
  },
  contentWrapper: {
    display: "grid",
    gridTemplateColumns: "20vw 1fr",
    gridRowStart: 2,
    height: "calc(100vh - 64px)",
  },
  sideBar: {
    padding: "3rem",
    boxShadow: "0px 20px 50px 1px #BBBBBB",
    position: "relative",
    overflow: "auto",
  },
  title: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "18px",
  },
  date: {
    color: `${theme.palette.secondary.lightGray}`,
    fontSize: "12px",
  },
  quantity: {
    color: `${theme.palette.primary.main}`,
  },
  cardWrapper: {
    marginTop: "30px",
  },
  link: {},
  card: {
    padding: "20px",
    borderRadius: "4px",
    boxShadow: "none",
    marginBottom: "20px",
    "&:hover": {
      cursor: "pointer",
      borderColor: `${theme.palette.secondary.main}`,
    },
  },
}));

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

  const getSingleRequest = async (ev, useEffectId) => {
    const id = ev.currentTarget.dataset.id || useEffectId;

    try {
      const AuthStr = localStorage.token;
      const { data } = await axios.get(`/api/reviews/requests/${id}`, {
        headers: { Authorization: "Bearer " + AuthStr },
      });
    } catch (err) {
      console.error(err);
    }
  };

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
                  onClick={getSingleRequest}
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
