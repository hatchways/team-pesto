import React, { useState, useEffect } from "react";
import { Paper, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Navbar from "components/Navbar";
import SingleView from "components/Reviews/SingleView";

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
  card: {
    padding: "20px",
    borderRadius: "4px",
    border: `1px solid ${theme.palette.secondary.lightGray}`,
    boxShadow: "none",
    marginBottom: "20px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  singleViewWrapper: {
    overflow: "auto",
  },
}));

const Reviews = () => {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);
  const [singleRequestView, setSingleRequestView] = useState(requests[0]);

  useEffect(() => {
    try {
      const AuthStr = localStorage.token;
      const callRequests = async () => {
        const { data } = await axios.get("/api/reviews/myrequests", {
          headers: { Authorization: "Bearer " + AuthStr },
        });
        setRequests(data.usersRequests);
      };

      callRequests();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getSingleRequest = async (ev) => {
    const id = ev.currentTarget.dataset.id;
    try {
      const AuthStr = localStorage.token;
      const { data } = await axios.get(`/api/reviews/myrequests/${id}`, {
        headers: { Authorization: "Bearer " + AuthStr },
      });
      setSingleRequestView(data.singleRequest[0]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.MainWrapper}>
      <Navbar className={classes.nav} />

      <div className={classes.contentWrapper}>
        <Paper className={classes.sideBar}>
          <Typography variant="h3">
            Requests{" "}
            <span className={classes.quantity}>({requests.length})</span>
          </Typography>

          <div className={classes.cardWrapper}>
            {requests.map((request) => (
              <Card
                key={request["_id"]}
                className={classes.card}
                onClick={getSingleRequest}
                data-id={request["_id"]}
              >
                <Typography className={classes.title}>
                  {request.title}
                </Typography>
                <Typography className={classes.date}>
                  {formatDate(request.date)}
                </Typography>
              </Card>
            ))}
          </div>
        </Paper>

        <div className={classes.singleViewWrapper}>
          {singleRequestView && (
            <SingleView singleRequestView={singleRequestView} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
