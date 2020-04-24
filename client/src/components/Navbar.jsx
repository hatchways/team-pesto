import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Badge,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";

import Notifications from "./Notifications/Notifications";
import UserContext from "context/UserContext";
import CodeUploadDialog from "pages/CodeUploadDialog";
import logo from 'assets/images/logo.png';

import socket from "utils/socket";

// TO DO: import styles from centralized location

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
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
    color: 'black',
    textDecoration: "none",
  },
  linkText: {
    color: "white",    
    fontWeight: "normal",
    textTransform: "none",
  },
  button: {
    color: `${theme.palette.secondary.main}`,
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
  const { user, setUser, logout } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState({});

  const handleUploadDialog = () => {
    setUploadDialogOpen(!uploadDialogOpen);
  };

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl({});
  };

  const handleLogout = () => {
    logout(socket);
    setAnchorEl({});
  };

  useEffect(() => {
    // initialize socket connection
    socket.connect(localStorage.token);

    // fetch all notifications for this user from db
    const fetchNotifications = async () => {
      const data = await socket.fetchNotifications();
      setNotifications(data.reverse());
    }
    fetchNotifications();

    // subscribe this component to socket IO client
    socket.subscribe("navbar", data => {
      const { type, payload } = data;
      switch (type) {
        case "add-notification":
          setNotifications(prevNotifications => [payload, ...prevNotifications]);
          return;
        case "read-notification":
          setNotifications(prevNotifications => prevNotifications.map(notification => {
            if (notification._id === payload) notification.seen = true;
            return notification;
          }));
          return;
        case "new-rating":
          setUser(prevUser => ({
            ...prevUser,
            totalRatings: prevUser.totalRatings + 1,
            totalRatingsScore: prevUser.totalRatingsScore + payload,
          }));
          return;
      }
    });

    // useEffect returns a callback for unsubscribing when it unmounts
    return () => socket.unsubscribe("navbar");
  }, []);

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Toolbar className={classes.logo}>
          <Link to="/">
            <img src={logo} />
          </Link>
        </Toolbar>

        <Toolbar className={classes.toolbar}>          
          <Link className={classes.link} to="/requests">
            <Button className={classes.clickable}>
              <span className={classes.linkText}>Requests</span>
            </Button>
          </Link>          

          <Link className={classes.link} to="/reviews">
            <Button className={classes.clickable}>            
              <span className={classes.linkText}>Reviews</span>
            </Button>
          </Link>

          <Link className={classes.link} to="/balance">
            <Button className={classes.clickable}>            
              <span className={classes.linkText}>Balance</span>
            </Button>
          </Link>

          <Button
            id="notifications"
            className={classes.clickable}
            onClick={handleMenu}
          >
            <Avatar className={classes.notification}>
              <Badge
                color="secondary"
                variant="dot"
                invisible={notifications.every((n) => n.seen)}
              >
                {notifications.length ? (
                  <NotificationsIcon />
                ) : (
                  <NotificationsNoneIcon />
                )}
              </Badge>
            </Avatar>
          </Button>

          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom" }}
            open={anchorEl.id === "notifications"}
            onClose={handleClose}
          >
            <Notifications notifications={notifications} />
          </Menu>

          <Button
            className={`${classes.clickable} ${classes.button}`}
            onClick={handleUploadDialog}
          >
            Upload Code
          </Button>

          <Button
            id="profile"
            className={classes.profileButton}
            onClick={handleMenu}
          >
            <Avatar src={user && user.image} />
            <div className={classes.linkText}>Profile</div>
            <div className={classes.triangle} />
          </Button>

          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={anchorEl.id === "profile"}
            onClose={handleClose}
          >
            <MenuItem>
              <Link className={classes.link} to="/">
                Go to Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Link className={classes.link} to="/">Logout</Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Toolbar>

      <CodeUploadDialog open={uploadDialogOpen} onClose={handleUploadDialog} />
    </AppBar>
  );
};

export default Navbar;
