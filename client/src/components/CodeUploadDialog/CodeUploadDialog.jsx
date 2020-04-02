import React, { useState } from 'react';
import { 
  Dialog,
  Box,
  Grid,
  TextField,
  MenuItem,
} from '@material-ui/core';

import useStyles from './CodeUploadDialog.css';

const CodeUploadDialog = () => {
  const classes = useStyles();

  const [ open, setOpen ] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={open}
      onClose={handleClose}
    >
      <Box p={4}>
        <h2 className={classes.header}>Request a code review</h2>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              variant='outlined'
              label='Title'
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              select
              variant='outlined'
              label='Language'
              fullWidth
            >
              <MenuItem value='javascript'>JavaScript</MenuItem>
              <MenuItem value='python'>Python</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default CodeUploadDialog;
