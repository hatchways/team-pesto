import React from "react";
import { Paper, Typography } from "@material-ui/core";
import formatDate from "utils/formatDate";
import Messages from "components/Reviews/Messages";

import useStyles from "./SingleView.css";

const SingleView = ({ singleRequestView, redirectId }) => {
  const classes = useStyles();
  const { title, date, messages, language } = singleRequestView;

  return (
    <Paper className={classes.singleView}>
      <div className={classes.header}>
        <div>
          <Typography className={classes.title} variant="h3">
            {title}
          </Typography>
          <Typography className={classes.date}>{formatDate(date)}</Typography>
        </div>
      </div>
      <div className={classes.syntaxWrapper}>
        {messages.map((message) => (
          <Messages
            key={message["_id"]}
            message={message}
            language={language}
            redirectId={redirectId}
          />
        ))}
      </div>
    </Paper>
  );
};

export default SingleView;
