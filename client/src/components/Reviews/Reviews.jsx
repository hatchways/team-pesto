import React, { useState, useEffect, useContext } from "react";
import { Paper, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Navbar from "components/Navbar";

import formatDate from "utils/formatDate";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "80%",
    margin: "10px",
  },
  paper: {
    padding: "64px 2rem 2rem 2rem",
    width: "20vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 20px 50px 1px #BBBBBB",
  },
}));

const Reviews = () => {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    try {
      const AuthStr = localStorage.token;
      const callRequests = async () => {
        const { data } = await axios.get("/api/reviews/myrequests", {
          headers: { Authorization: "Bearer " + AuthStr },
        });
        setRequests(data.reviews);
      };

      callRequests();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Paper className={classes.paper}>
        <h2>Requests ({requests.length})</h2>
        {requests.map((request) => (
          <Card key={request["_id"]} className={classes.card}>
            {request.title}
            <br />
            {formatDate(request.date)}
          </Card>
        ))}
      </Paper>
    </div>
  );
};

export default Reviews;
