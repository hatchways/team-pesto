import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import AppSnackbarContext from 'context/AppSnackbarContext';
import ReviewThreads from 'components/ReviewThreads';
import { getToken } from 'utils/storage';
import socket from "utils/socket";

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
        setRequests(data.requests);
      })();      
    } catch (err) {
      const errorMessage = err.response.data.response || err.response.data;
      setSnackbar({ open: true, severity: 'error', message: errorMessage });
    }
  };

  useEffect(() => {
    fetchRequests();
    socket.subscribe("requests", data => {
      const { type, payload } = data;
      switch (type) {
        case "refetch":
          fetchRequests();
          return;
        case "new-post":
          setRequests(prevRequests => {
            return prevRequests.map(request => {
              if (request['_id'] === payload.requestId) {
                request.messages.push(payload.message);
              }
              return request;
            })

          });
          return;
      }
    });

    // useEffect returns a callback for unsubscribing when it unmounts
    return () => socket.unsubscribe("requests");
  }, []);
  
  return (
    <ReviewThreads
      reviews={requests}
      type='requests'
      fetchReviews={fetchRequests}
    />
  );
};

export default Requests;
