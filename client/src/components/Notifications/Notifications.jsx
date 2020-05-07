import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  MenuItem,
  Grid,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  unseenMenuItem: {
    borderBottomStyle: "solid",
    borderWidth: "1px",
    borderColor: "#EEEEEE",
    backgroundColor: `${theme.palette.secondary.main}`,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: `${theme.palette.secondary.light}`,
    },
  },
  seenMenuItem: {
    borderBottomStyle: "solid",
    borderWidth: "1px",
    borderColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#EEEEEE",
    },
  },
  notificationTitle: {
    fontSize: "small",
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: "x-small",
  },
  link: {
    textDecoration: "none",
    color: "#000000",
  },
  closeIconRow: {
    height: "10px",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  closeIcon: {
    height: "10px",
    width: "10px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  grid: {
    alignItems: "flex-start",
  }
}));

const parseDate = date => {
  const ref = {
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    week: 604800000,
    month: 2592000000,
    year: 31536000000,
  };
  const delta = Date.now() - date;
  if (delta < ref.minute) {
    return "Just now";
  } else if (delta < ref.hour) {
    const n = Math.floor(delta / ref.minute);
    return `${n} minute${n > 1 ? 's' : ''} ago`;
  } else if (delta < ref.day) {
    const n = Math.floor(delta / ref.hour);
    return `${n} hour${n > 1 ? 's' : ''} ago`;
  } else if (delta < ref.week) {
    const n = Math.floor(delta / ref.day);
    return `${n} day${n > 1 ? 's' : ''} ago`;
  } else if (delta < ref.month) {
    const n = Math.floor(delta / ref.week);
    return `${n} week${n > 1 ? 's' : ''} ago`;
  } else if (delta < ref.year) {
    const n = Math.floor(delta / ref.month);
    return `${n} month${n > 1 ? 's' : ''} ago`;
  } else {
    return "Over a year ago";
  }
};

const handleClick = async (id, setNotifications) => {
  try {
    await axios.put(`/api/notifications/${id}`);
    setNotifications(prevNotifications => prevNotifications.map(notification => {
      if (notification._id === id) notification.seen = true;
      return notification;
    }));
  } catch(err) {
    console.error(err);
  }
};

const handleDelete = async (id, setNotifications) => {
  try {
    await axios.delete(`/api/notifications/${id}`);
    setNotifications(prevNotifications => prevNotifications.filter(notification => {
      return notification._id !== id;
    }));
  } catch(err) {
    console.error(err);
  }
};

const Notifications = ({ notifications, setNotifications }) => {
  const classes = useStyles();
  return (
    <>
      {
        notifications.length ? notifications.map((notification, i) => (
          <MenuItem
            key={i}
            className={notification.seen ? classes.seenMenuItem : classes.unseenMenuItem}
          >
            <Link to={notification.link} className={classes.link}>
              <Grid container direction="column" className={classes.grid}>
                <div className={classes.closeIconRow}>
                  <CloseIcon
                    className={classes.closeIcon}
                    onClick={() => handleDelete(notification._id, setNotifications)}
                  />
                </div>
                <div onClick={() => handleClick(notification._id, setNotifications)}>
                  <Typography className={classes.notificationTitle}>{notification.title}</Typography>
                  <Typography className={classes.timestamp}>{parseDate(notification.date)}</Typography>
                </div>
              </Grid>
            </Link>
          </MenuItem>
        )) : (
          <MenuItem className={classes.seenMenuItem}>
            <Grid container direction="column">
              <Typography>No notifications.</Typography>
            </Grid>
          </MenuItem>
        )
      }
    </>
  );
};

export default Notifications;