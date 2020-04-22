import React, { useContext } from "react";
import { Paper, Typography, Avatar } from "@material-ui/core";
import UserContext from "context/UserContext";
import formatDate from "utils/formatDate";
import CodeEditor from "components/CodeEditor";

import useStyles from "./Thread.css";

const Thread = (props) => {
  const classes = useStyles();

  const { user } = useContext(UserContext);
  const { title, date, messages, language } = props.singleRequestView;

  return (
    <Paper className={classes.singleView}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="h3">
          {title}
        </Typography>
        <Typography className={classes.date}>{formatDate(date)}</Typography>
      </div>
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
