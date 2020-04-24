import React, { useState, useContext } from 'react';
import { Chip, Button, Box, Typography, Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import { HourglassFull, Check, DoneAll, EmojiEmotions, SentimentSatisfied } from '@material-ui/icons';
import axios from 'axios';

import useStyles from './ThreadHeader.css';
import AppSnackbarContext from 'context/AppSnackbarContext';
import { getToken } from 'utils/storage';
import formatDate from 'utils/formatDate';

const ThreadHeader = ({ type, review, fetchReviews }) => {
  const classes = useStyles();

  const MAX_RATING = 5;
  const { status, title, date } = review;

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleCloseRatingDialog = () => {    
    setDialogOpen(false);
  };

  const renderRatingSelector = () => {
    const selector = [];
    let numGood = rating;
    for (let i = 0; i < MAX_RATING; i++) {
      if (numGood) {
        selector.push(
          <EmojiEmotions
            key={i}
            color='primary'
            className={classes.ratingIcon}
            onMouseOver={() => { setRating(i + 1) }}
          />
        );
        numGood--;
      } else {
        selector.push(
          <SentimentSatisfied
            key={i}
            color='primary'
            className={classes.ratingIcon}
            onMouseOver={() => { setRating(i + 1) }}
          />
        );
      }
    }

    return selector;
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
  if (type === 'requests' && status === 'accepted') {
    actions = (
      <Button
        variant='contained'
        color='primary'
        disableElevation
        onClick={() => { setDialogOpen(true) }}
      >
        Mark as Complete
      </Button>
    );
  }

  return (
    <>
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

      <Dialog open={dialogOpen} onClose={handleCloseRatingDialog}>
        <DialogContent>
          <h2>Please rate your reviewer</h2>          
          <Box display='flex' justifyContent='center' mt={5} mb={7}>
            {renderRatingSelector()}
          </Box>
          <DialogActions>
            <Button>Submit</Button>
            <Button onClick={handleCloseRatingDialog}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ThreadHeader;
