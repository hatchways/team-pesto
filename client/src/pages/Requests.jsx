import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import AppSnackbarContext from 'context/AppSnackbarContext';
import ReviewThreads from 'components/ReviewThreads';
import { getToken } from 'utils/storage';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const { setSnackbar } = useContext(AppSnackbarContext);

  const fetchRequests = () => {
    try {
      const token = getToken();
      (async () => {
        const { data } = await axios.get("/api/reviews/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(data.usersRequests);
      })();      
    } catch (err) {
      const errorMessage = err.response.data.response || err.response.data;
      setSnackbar({ open: true, severity: 'error', message: errorMessage });
    }
  };
  useEffect(fetchRequests, []);

  return (
    <ReviewThreads
      reviews={requests}
      type='requests'
      fetchReviews={fetchRequests}
    />
  );
};

export default Requests;
