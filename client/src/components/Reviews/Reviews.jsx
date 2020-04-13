import React, { useState, useEffect, useContext } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Navbar from "components/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `${theme.palette.secondary.light}`,
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: "2rem",
    marginTop: "64px",
    width: "20vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
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
        <ul>
          {requests.map((request) => (
            <li key={request.id}>{request.title}</li>
          ))}
        </ul>
      </Paper>
    </div>
  );
};

export default Reviews;
