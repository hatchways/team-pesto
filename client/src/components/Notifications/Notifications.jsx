import React from "react";
import {
  makeStyles,
  MenuItem,
  Grid,
  Typography,
} from "@material-ui/core";

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
      backgroundColor: "EEEEEE",
    },
  },
  notificationTitle: {
    fontSize: "small",
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: "x-small",
  },
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


const Notifications = ({ notifications }) => {
  const classes = useStyles();
  return (
    <>
      {
        notifications.length ? notifications.map((notification, i) => (
          <MenuItem
            key={i}
            className={notification.seen ? classes.seenMenuItem : classes.unseenMenuItem}
          >
            <Grid container direction="column">
              <Typography className={classes.notificationTitle}>{notification.title}</Typography>
              <Typography className={classes.timestamp}>{parseDate(notification.date)}</Typography>
            </Grid>
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