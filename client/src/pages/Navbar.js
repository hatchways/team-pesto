import React, { useContext, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/Appbar";
import styles from "";        // some centralized styles file

const useStyles = makeStyles(styles);

const Navbar = () => {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  return (
    <AppBar>
      
    </AppBar>
  );
}

export default Navbar;