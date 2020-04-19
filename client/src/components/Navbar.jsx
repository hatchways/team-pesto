import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, Menu, MenuItem, Avatar, Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import UserContext from "context/UserContext";
import CodeUploadDialog from 'pages/CodeUploadDialog';
// import axios from "axios";

import socket from "utils/socket";

import Notifications from "./Notifications/Notifications";

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
    fontWeight: "normal",
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
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState({});
  const [notifications, setNotifications] = useState([]);

  const handleUploadDialog = () => {
    setUploadDialogOpen(!uploadDialogOpen);
  };

  const handleMenu = e => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl({});
  };

  const handleLogout = () => {
    logout(socket);
    setAnchorEl({})
  };

  useEffect(() => {
    socket.connect(localStorage.token);
    socket.fetchNotifications(setNotifications);
  }, []);

  console.log(notifications)

  return (
    <AppBar>
      <Toolbar>
        
        <Toolbar className={classes.logo}>
          <Link to="/">
            <img src="logo.png" />
          </Link>
        </Toolbar>

        <Toolbar className={classes.toolbar}>
          <Button className={classes.clickable}>
            <Link className={classes.link} to="/reviews">Reviews</Link>
          </Button>

          <Button className={classes.clickable}>
            <Link className={classes.link} to="/balance">Balance</Link>
          </Button>

          <Button id="notifications" className={classes.clickable} onClick={handleMenu}>
            <Avatar className={classes.notification}>
              <Badge color="secondary" variant="dot" invisible={notifications.every(n => n.seen)}>
                <NotificationsIcon />
              </Badge>
            </Avatar>
          </Button>

          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom" }}
            open={anchorEl.id === "notifications"}
            onClose={handleClose}
          >
            <Notifications
              notifications={notifications}
            />
          </Menu>
          
          <Button
            className={`${classes.clickable} ${classes.button}`}
            onClick={handleUploadDialog}
          >
            Upload Code
          </Button>          

          <Button id="profile" className={classes.profileButton} onClick={handleMenu}>
            <Avatar src={user && user.image}/>
            <div className={classes.link}>Profile</div>
            <div className={classes.triangle} />
          </Button>

          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={anchorEl.id === "profile"}
            onClose={handleClose}
          >
            <>
              <MenuItem>
                <Link to="/profile">Go to Profile</Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Link to="/">Logout</Link>
              </MenuItem>
            </>
          </Menu>

        </Toolbar>
      </Toolbar>
      
      <CodeUploadDialog
        open={uploadDialogOpen}
        onClose={handleUploadDialog}
      />
    </AppBar>
  );
};

export default Navbar;
