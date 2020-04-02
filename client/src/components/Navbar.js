import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, Menu, MenuItem } from "@material-ui/core";
import UserContext from "../context/UserContext";
// import styles from "";        // some centralized styles file

// const useStyles = makeStyles(styles);

const Navbar = () => {
  // const classes = useStyles();

  const { user } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);

  // const handleMenu = e => setAnchorEl(e.currentTarget);

  return (
    <AppBar>
      <Toolbar>
        <img src="logo.png"></img>
        <Toolbar>
          <Link to="/reviews">
            Reviews
          </Link>
          <Link to="/balance">
            Balance
          </Link>
          <Link to="/upload">
            <Button>
              Upload Code
            </Button>
          </Link>
          <Button onClick={e => setAnchorEl(e.currentTarget)}>
            Profile
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem>
              <Link to="/profile">
                Go to Profile
              </Link>
            </MenuItem>
            <MenuItem>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;