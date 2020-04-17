import React, { useContext, useState, useReducer } from "react";
import {
  makeStyles,
  MenuItem,
  Grid,
  Typography,
} from "@material-ui/core";

import UserContext from "context/UserContext";

import theme from "themes/theme";

const useStyles = makeStyles({
  menuItem: {
    borderBottomStyle: "solid",
    borderWidth: "1px",
    borderColor: "#EEEEEE",
  },
  notificationTitle: {
    fontSize: "small",
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: "x-small",
  },
});

const initialState = {
  // TO DO: REPLACE THIS MOCK DATA WITH `[]`
  notifications: [
    {
      title: "You have a new review!",
      date: Date.now() - 7200000,       // 2 hours ago
      seen: false,
    },
    {
      title: "You have a new review!",
      date: Date.now() - 604800000,     // 1 week ago
      seen: true,
    },
    {
      title: "You have a new review!",
      date: Date.now() - 1209600000,    // 2 weeks (14 days) ago
      seen: false,
    },
    {
      title: "You have a new review!",
      date: Date.now() - 2592000000,    // 1 month (30 days) ago
      seen: false,
    },
    {
      title: "You have a new review!",
      date: Date.now() - 12960000000,    // 5 months (150 days) ago
      seen: true,
    },
  ]
}

const reducer = (state, action) => {
  switch (action.type) {
    case "getNotifications":
      return { ...state, notifications: action.payload};
    case "newNotification":
      return { ...state, notifications: [action.payload, ...state.notifications]};
  }
}

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

const Notifications = ({ setNewNotifications }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [unreadCount, setUnreadCount] = useState(3);              // TO DO: useState(0)
  const { user } = useContext(UserContext);
  const classes = useStyles();

  return (
    <>
      {state.notifications.map((notification, i) => (
        <MenuItem
          key={i}
          className={classes.menuItem}
          style={{backgroundColor: notification.seen ? "white" : theme.palette.secondary.main}}
          onMouseEnter={e =>
            e.target.style.backgroundColor = theme.palette.secondary.light
          }
          onMouseLeave={e =>
            e.target.style.backgroundColor = notification.seen ? "white" : theme.palette.secondary.main
          }
        >
          <Grid container direction="column">
            <Typography className={classes.notificationTitle}>{notification.title}</Typography>
            <Typography className={classes.timestamp}>{parseDate(notification.date)}</Typography>
          </Grid>
        </MenuItem>
      ))}
    </>
  );
};

export default Notifications;