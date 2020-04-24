import React from "react";
import { Paper } from "@material-ui/core";

import useStyles from "./Thread.css";
import ThreadHeader from 'components/ReviewThreads/ThreadHeader';
import Messages from 'components/ReviewThreads/Messages';

const Thread = ({ review, type, fetchReviews }) => {
  const classes = useStyles();

  const { messages, language } = review;

  return (
    <Paper className={classes.singleView}>
      <ThreadHeader type={type} review={review} fetchReviews={fetchReviews} />

      <div className={classes.syntaxWrapper}>
        {messages.map((message) => (
          <Messages
            reviewId={review._id}
            key={message._id}
            message={message}
            language={language}
            fetchReviews={fetchReviews}
          />
        ))}
      </div>
    </Paper>
  );
};

export default Thread;
