import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReviewThreads from 'components/ReviewThreads';
import { getToken } from 'utils/storage';

const Reviews = ({ match }) => {
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
    <ReviewThreads
      reviews={reviews}
      type='reviews'
      match={match}
    />
  );
};

export default Reviews;
