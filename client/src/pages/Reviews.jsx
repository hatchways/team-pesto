import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import AppSnackbarContext from 'context/AppSnackbarContext';
import ReviewThreads from 'components/ReviewThreads';
import { getToken } from 'utils/storage';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const { setSnackbar } = useContext(AppSnackbarContext);

  const fetchReviews = () => {
    try {
      const token = getToken();
      (async () => {
        const { data } = await axios.get("/api/reviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(data.reviews);
      })();
    } catch (err) {
      const errorMessage = err.response.data.response || err.response.data;
      setSnackbar({ open: true, severity: 'error', message: errorMessage });
    }
  };
  useEffect(fetchReviews, []);

  // TO DO: MAKE THIS SUBSCRIBE TO SOCKETS
  
  return (
    <ReviewThreads
      reviews={reviews}
      type='reviews'
      fetchReviews={fetchReviews}
    />
  );
};

export default Reviews;
