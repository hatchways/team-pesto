import React, { useContext } from "react";
import { Button, Paper, Typography, Avatar } from "@material-ui/core";
import UserContext from "context/UserContext";
import formatDate from "utils/formatDate";
import CodeEditor from "components/CodeEditor";

import useStyles from "./Thread.css";

const Thread = ({ review, type }) => {
  const classes = useStyles();

  const { user } = useContext(UserContext);
  const { title, date, messages, language, status } = review;

  const renderHeader = () => {
    let actions = null;
    if (type === 'reviews' && status === 'pending') {
      actions = (
        <div className={classes.headerActions}>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            className={classes.headerActionButton}
          >
            Accept
          </Button>
          <Button
            variant='outlined'
            color='primary'
            className={classes.headerActionButton}
          >
            Reject
          </Button>
        </div>
      );
    }

    return (
      <div className={classes.header}>
        <div>
          <Typography className={classes.title} variant="h3">
            {title}
          </Typography>
          <Typography className={classes.date}>{formatDate(date)}</Typography>
        </div>

        {actions}
      </div>
    );
  };

  return (
    <Paper className={classes.singleView}>
      {renderHeader()}

      <div className={classes.syntaxWrapper}>
        {messages.map((message) => (
          <div key={message["_id"]}>
            <div className={classes.syntax}>
              <CodeEditor
                language={language}
                value={message.code}
                readOnly={true}
              />
            </div>

            <div className={classes.author}>
              <div className={classes.authorHeader}>
                <div className={classes.authorAvatar}>
                  <Avatar src={user && user.image} />
                </div>
                <div>
                  <Typography variant="h5">John Doe</Typography>
                  <Typography className={classes.date}>
                    {formatDate(message.date)}
                  </Typography>
                </div>
              </div>
              <div className={classes.authorComment}>
                <Typography>{message.comments}</Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default Thread;
