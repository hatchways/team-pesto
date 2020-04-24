import React, { useState, useContext } from 'react';
import { Chip, Button, Box, Typography } from '@material-ui/core';
import { HourglassFull, Check, DoneAll } from '@material-ui/icons';
import axios from 'axios';

import useStyles from './ThreadHeader.css';
import AppSnackbarContext from 'context/AppSnackbarContext';
import { getToken } from 'utils/storage';
import formatDate from 'utils/formatDate';

const ThreadHeader = ({ type, review, fetchReviews }) => {
  const classes = useStyles();

  const { status, title, date } = review;

  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useContext(AppSnackbarContext);

  const handleAcceptReject = async (newStatus) => {
    setLoading(true);

    const token = getToken();
    try {
      const { data } = await axios.put(
        `/api/reviews/${review._id}/status`,
        { status: newStatus },
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

  let statusChip = null;
  switch (status) {
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
  }

  let actions = null;
  if (type === 'reviews' && status === 'pending') {
    actions = (
      <div>
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
          <Typography>{formatDate(date)}</Typography>
        </div>

        {actions}
      </Box>
    </div>
  );
};

export default ThreadHeader;
