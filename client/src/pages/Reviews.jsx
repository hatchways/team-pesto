import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import AppSnackbarContext from 'context/AppSnackbarContext';
import ReviewThreads from 'components/ReviewThreads';
import { getToken } from 'utils/storage';
import socket from "utils/socket";

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

  useEffect(() => {
    fetchReviews();
    socket.subscribe("reviews", data => {
      const { type, payload } = data;
      switch (type) {
        case "refetch":
          fetchReviews();
          return;
        case "new-post":
          setReviews(prevReviews => {
            return prevReviews.map(review => {
              if (review['_id'] === payload.requestId) {
                review.messages.push(payload.message);
              }
              return review;
            })

          });
          return;
      }
    });

    // useEffect returns a callback for unsubscribing when it unmounts
    return () => socket.unsubscribe("reviews");
  }, []);

  return (
    <ReviewThreads
      reviews={reviews}
      type='reviews'
      fetchReviews={fetchReviews}
    />
  );
};

export default Reviews;
