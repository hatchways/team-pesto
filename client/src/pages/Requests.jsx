import React, { useState, useEffect } from "react";
import axios from "axios";

import ReviewThreads from 'components/ReviewThreads';
import { getToken } from 'utils/storage';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    try {
      const token = getToken();
      (async () => {
        const { data } = await axios.get("/api/reviews/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(data.usersRequests);
      })();      
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ReviewThreads
      reviews={requests}
      type='requests'
    />
  );
};

export default Requests;
