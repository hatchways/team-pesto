import React, { useState } from "react";
import { Paper, Typography, Avatar } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import formatDate from "utils/formatDate";
import Messages from "components/Reviews/Messages";

import useStyles from "./SingleView.css";

const SingleView = (props) => {
  const classes = useStyles();
  const { title, date, messages, language } = props.singleRequestView;

  const [editMode, setEditMode] = useState(false);

  const editMessage = () => {
    setEditMode(!editMode);
  };
  return (
    <Paper className={classes.singleView}>
      <div className={classes.header}>
        <div>
          <Typography className={classes.title} variant="h3">
            {title}
          </Typography>
          <Typography className={classes.date}>{formatDate(date)}</Typography>
        </div>

        {editMode ? <Typography>You are now in edit mode.</Typography> : null}

        <EditIcon className={classes.editIcon} onClick={editMessage} />
      </div>
      <div className={classes.syntaxWrapper}>
        {messages.map((message) => (
          <Messages message={message} language={language} editMode={editMode} />
        ))}
      </div>
    </Paper>
  );
};

export default SingleView;
