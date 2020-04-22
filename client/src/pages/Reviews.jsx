import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReviewThreads from 'components/ReviewThreads';
import { getToken } from 'utils/storage';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

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
      console.error(err);
    }
  };
  useEffect(fetchReviews, []);

  return (
    <ReviewThreads
      reviews={reviews}
      type='reviews'
      fetchReviews={fetchReviews}
    />
  );
};

export default Reviews;
