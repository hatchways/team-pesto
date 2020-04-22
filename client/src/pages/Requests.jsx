import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import AppSnackbarContext from 'context/AppSnackbarContext';
import ReviewThreads from 'components/ReviewThreads';
import { getToken } from 'utils/storage';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const { setSnackbar } = useContext(AppSnackbarContext);

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
      const errorMessage = err.response.data.response || err.response.data;
      setSnackbar({ open: true, severity: 'error', message: errorMessage });
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
