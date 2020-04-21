import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@material-ui/core';

import useStyles from './Reviews.css';
import ReviewSidebar from 'components/ReviewSidebar';
import SingleView from 'components/SingleView';
import { getToken } from 'utils/storage';

const Reviews = () => {
  const classes = useStyles();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    try {
      const token = getToken();
      (async () => {
        const { data } = await axios.get("/api/reviews/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(data.reviews);
      })();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className={classes.reviews}>
      <ReviewSidebar reviews={reviews} />
      <div className={classes.threadContainer}>
        {
          reviews.length 
            ? <SingleView singleRequestView={reviews[0]} /> 
            : null
        }
      </div>
    </div>
  );
};

export default Reviews;
