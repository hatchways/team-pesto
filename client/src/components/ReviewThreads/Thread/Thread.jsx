import React, { useState, useContext } from "react";
import { Button, Box, Chip, Paper, Typography } from "@material-ui/core";
import { HourglassFull, Check, DoneAll } from '@material-ui/icons';
import axios from 'axios';

import useStyles from "./Thread.css";
import AppSnackbarContext from 'context/AppSnackbarContext';
import Messages from 'components/ReviewThreads/Messages';
import { getToken } from 'utils/storage';
import formatDate from "utils/formatDate";

const Thread = ({ review, type, fetchReviews }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const { setSnackbar } = useContext(AppSnackbarContext);

  const { title, date, messages, language, status } = review;

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
    let statusChip;
    switch (review.status) {
      case 'pending':
        statusChip = 
          <Chip
            icon={<HourglassFull />}
            label='Pending'
            size='small'
            color='primary'
            variant='outlined'
          />;
        break;
      case 'accepted':
        statusChip =
          <Chip
            icon={<Check />}
            label='Accepted'
            size='small'
            color='primary'
            variant='outlined'
          />;
        break;
      case 'completed':
        statusChip =
          <Chip
            icon={<DoneAll />}
            label='Completed'
            size='small'
            color='primary'
            variant='default'
          />;
        break;
      default:
        statusChip = null;
    }

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
    if (type === 'requests' && status === 'accepted') {
      actions = (
        <div className={classes.headerActions}>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            disabled={loading}
            className={classes.headerActionButton}            
          >
            Mark as Complete
          </Button>
        </div>
      );
    }

    return (
      <div className={classes.header}>
        {statusChip}

        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mt={1}
        >
          <div>          
            <Typography className={classes.title} variant="h3">
              {title}
            </Typography>
            <Typography className={classes.date}>{formatDate(date)}</Typography>
          </div>

          {actions}
        </Box>
      </div>
    );
  };

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
      </div>
    </Paper>
  );
};

export default Thread;
