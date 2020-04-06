import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, Menu, MenuItem, Avatar, Badge } from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import UserContext from "context/UserContext";

// TO DO: import styles from centralized location

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "10%",
  },
  toolbar: {
    flexGrow: "1",
    display: "flex",
    justifyContent: "flex-end",
  },
  clickable: {
    margin: "0 10px 0 10px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    textTransform: "none",
  },
  button: {
    color: `${theme.palette.secondary.main}`,
    textDecoration: "none",
    textTransform: "none",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: 20,
    width: "15ch",
    padding: 10,
  },
  notification: {
    backgroundColor: `${theme.palette.primary.dark}`,
  },
  profileButton: {
    width: "20ch",
    margin: "0 10px 0 10px",
    display: "flex",
    justifyContent: "space-around",
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    borderTop: "5px solid white",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { user, logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null)
  };

  return (
    <AppBar>
      <Toolbar>
        <Toolbar className={classes.logo}>
          <img src="logo.png" />
        </Toolbar>
        <Toolbar className={classes.toolbar}>
          <Button className={classes.clickable}>
            <Link className={classes.link} to="/reviews">Reviews</Link>
          </Button>
          <Button className={classes.clickable}>
            <Link className={classes.link} to="/balance">Balance</Link>
          </Button>
          <Button className={classes.clickable}>
            <Avatar className={classes.notification}>
              <Badge color="secondary" variant="dot">
                <NotificationsNoneIcon />
              </Badge>
            </Avatar>
          </Button>
          <Button className={classes.clickable}>
            <Link className={classes.button} to="/upload">Upload Code</Link>
          </Button>
          <Button className={classes.profileButton} onClick={handleMenu}>
            <Avatar src={user && user.image}/>
            <div className={classes.link}>Profile</div>
            <div className={classes.triangle} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
          >
            <MenuItem>
              <Link to="/profile">Go to Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
