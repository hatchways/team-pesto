import React from "react";
import { Link } from "react-router-dom";
import { Paper, Card, Typography } from "@material-ui/core";
import useStyles from "pages/Requests/Requests.css";

import formatDate from "utils/formatDate";

const Sidebar = ({ requests, borderColor }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.sideBar}>
      <Typography variant="h3">
        Requests <span className={classes.quantity}>({requests.length})</span>
      </Typography>

      <div className={classes.cardWrapper}>
        {requests.map((request) => (
          <Link
            key={request["_id"]}
            className={classes.link}
            to={`/requests/${request["_id"]}`}
          >
            <Card
              className={classes.card}
              data-id={request["_id"]}
              variant="outlined"
              style={borderColor(request["_id"])}
            >
              <Typography className={classes.title}>{request.title}</Typography>
              <Typography className={classes.date}>
                {formatDate(request.date)}
              </Typography>
            </Card>
          </Link>
        ))}
      </div>
    </Paper>
  );
};

export default Sidebar;
