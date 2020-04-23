import React, { useState, useContext } from "react";
import { Paper, Typography, Button } from "@material-ui/core";

import UserContext from "context/UserContext";
import formatDate from "utils/formatDate";
import Messages from "components/SingleView/Messages";
import NewPost from "components/SingleView/NewPost";
import useStyles from "./SingleView.css";

const SingleView = ({ singleRequestView }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { title, date, messages, language, _id } = singleRequestView;
  const [newPost, setNewPost] = useState(null);

  const handleNewPost = () => {
    try {
      setNewPost(true);
    } catch (err) {
      console.error(err);
    }
  }

  // {date: '...', _id: '...', authorId: '...', code: '...', comments: '...'}
  // console.log('MESSAGES[0]:', messages[0])

  return (
    <div className={classes.singleViewWrapper}>
      <Paper className={classes.singleView}>
        <div className={classes.header}>
          <div>
            <Typography className={classes.title} variant="h3">
              {title}
            </Typography>
            <Typography className={classes.date}>{formatDate(date)}</Typography>
          </div>
        </div>
        <div className={classes.syntaxWrapper}>
          {messages.map((message) => (
            <Messages
              key={message["_id"]}
              requestId={_id}
              message={message}
              language={language}
            />
          ))}
        </div>
        {!newPost ? (
          <div className={classes.addPost}>
            <Button className={classes.button} onClick={handleNewPost}>Add Post</Button>
          </div>
        ) : (
          <NewPost
            language={language}
          />
        )}
      </Paper>
    </div>
  );
};

export default SingleView;
