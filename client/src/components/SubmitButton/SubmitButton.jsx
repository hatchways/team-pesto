import React from 'react';
import { Button } from '@material-ui/core';

import useStyles from './SubmitButton.css';

const SubmitButton = ({ children, onClick, className, disabled }) => {
  const classes = useStyles();

  return (
    <Button
      type='submit'
      variant='contained'
      className={`${classes.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
