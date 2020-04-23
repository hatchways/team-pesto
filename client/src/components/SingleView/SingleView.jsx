import React from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import formatDate from "utils/formatDate";
import Messages from "components/SingleView/Messages";

import useStyles from "./SingleView.css";

const SingleView = ({ singleRequestView }) => {
  const classes = useStyles();
  const { title, date, messages, language, _id } = singleRequestView;

  return (
    <div className={classes.singleViewWrapper}>
      <Paper className={classes.singleView}>
        <div className={classes.header}>
          <div>
            <Typography className={classes.title} variant="h3">
              {title}
            </Typography>
            <Typography className={classes.date}>{formatDate(date)}</Typography>

            <Button>ADD POST</Button>

          </div>
        </div>
        <div className={classes.syntaxWrapper}>
          {messages.map((message) => (
            <Messages
              requestId={_id}
              key={message["_id"]}
              message={message}
              language={language}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default SingleView;
