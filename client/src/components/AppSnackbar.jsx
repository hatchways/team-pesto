import React, { useContext } from 'react';
import { Portal, Snackbar } from '@material-ui/core';
import { Alert } from "@material-ui/lab";

import AppSnackbarContext from 'context/AppSnackbarContext';

const AppSnackbar = () => {
  const { snackbar, setSnackbar } = useContext(AppSnackbarContext);

  const handleSnackbarClose = () => {
    setSnackbar({ 
      open: false,
      severity: snackbar.severity,
      message: snackbar.message,
    });
  };

  return (
    <Portal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert variant="filled" severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Portal>
  );
};

export default AppSnackbar;
