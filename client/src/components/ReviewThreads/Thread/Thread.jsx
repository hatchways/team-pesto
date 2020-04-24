import React, { useState, useContext } from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import axios from 'axios';

import useStyles from "./Thread.css";
import AppSnackbarContext from 'context/AppSnackbarContext';
import UserContext from "context/UserContext";
import Messages from 'components/ReviewThreads/Messages';
import NewPost from "components/ReviewThreads/Messages/NewPost";
import { getToken } from 'utils/storage';
import formatDate from "utils/formatDate";

const Thread = ({ review, type, fetchReviews }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useContext(AppSnackbarContext);
  const { user } = useContext(UserContext);
  const { title, date, messages, language, status } = review;
  const [newPost, setNewPost] = useState(null);
  
  const handleAcceptReject = async (status) => {
    setLoading(true);

    const token = getToken();
    try {
      const { data } = await axios.put(
        `/api/reviews/${review._id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSnackbar({ open: true, severity: 'success', message: data });
      fetchReviews();
    } catch (err) {
      const errMessage = err.response.data.response || err.response.data;
      setSnackbar({ open: true, severity: 'error', message: errMessage });
    }

    setLoading(false);
  };

  const renderHeader = () => {
    let actions = null;
    if (type === 'reviews' && status === 'pending') {
      actions = (
        <div className={classes.headerActions}>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            disabled={loading}
            className={classes.headerActionButton}            
            onClick={() => { handleAcceptReject('accepted') }}
          >
            Accept
          </Button>
          <Button
            variant='outlined'
            color='primary'
            disabled={loading}
            className={classes.headerActionButton}
            onClick={() => { handleAcceptReject('rejected') }}
          >
            Reject
          </Button>
        </div>
      );
    }

    return (
      <div className={classes.header}>
        <div>
          <Typography className={classes.title} variant="h3">
            {title}
          </Typography>
          <Typography className={classes.date}>{formatDate(date)}</Typography>
        </div>

        {actions}
      </div>
    );
  };

  const handleNewPost = () => {
    try {
      setNewPost(true);
    } catch (err) {
      console.error(err);
    }
  }
    
  return (
    <Paper className={classes.singleView}>
      {renderHeader()}  

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
        {(user.id === review.requesterId || review.status === "accepted") && (
          !newPost ? (
            <div className={classes.addPost}>
              <Button className={classes.button} onClick={handleNewPost}>Add Post</Button>
            </div>
          ) : (
            <NewPost
              reviewId={review._id}
              language={language}
              setNewPost={setNewPost}
            />
          )
        )}
      </div>
    </Paper>
  );
};

export default Thread;
