import React, { useState, useEffect } from "react";
import { Paper, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Navbar from "components/Navbar";

import formatDate from "utils/formatDate";

const useStyles = makeStyles((theme) => ({
  MainWrapper: {
    display: "grid",
    gridTemplateColumns: "20vw 1fr",
    gridTemplateRows: "64px 1fr",
    gridTemplateAreas: "'nav nav' 'sidebar content'",
    backgroundColor: `${theme.palette.secondary.light}`,
  },
  nav: {
    gridArea: "nav",
  },
  sideBar: {
    padding: "2rem",
    height: "calc(100vh - 64px)",
    boxShadow: "0px 20px 50px 1px #BBBBBB",
    gridArea: "sidebar",
    gridRowStart: 2,
  },
  title: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "20px",
  },
  date: {
    color: `${theme.palette.secondary.lightGray}`,
  },
  quantity: {
    color: `${theme.palette.primary.main}`,
  },
  cardWrapper: {
    marginTop: "30px",
  },
  card: {
    padding: "20px",
    marginBottom: "10px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  singleView: {
    gridArea: "content",
    margin: "50px;",
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
      <Paper className={classes.sideBar}>
        <Typography variant="h3">
          Requests <span className={classes.quantity}>({requests.length})</span>
        </Typography>

        <div className={classes.cardWrapper}>
          {requests.map((request) => (
            <Card
              key={request["_id"]}
              className={classes.card}
              onClick={getSingleRequest}
              data-id={request["_id"]}
            >
              <div className={classes.title}>{request.title}</div>
              <br />
              <div className={classes.date}>{formatDate(request.date)}</div>
            </Card>
          ))}
        </div>
      </Paper>

      {singleRequestView && (
        <Paper className={classes.singleView}>
          {
            <Typography className={classes} variant="h3">
              {singleRequestView.title}
            </Typography>
          }
        </Paper>
      )}
    </div>
  );
};

export default Reviews;
