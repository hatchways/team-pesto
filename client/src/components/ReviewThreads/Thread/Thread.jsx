import React, { useState, useContext } from "react";
import { Paper, Button, Box, Divider } from "@material-ui/core";

import useStyles from "./Thread.css";
import ThreadHeader from 'components/ReviewThreads/ThreadHeader';
import Messages from 'components/ReviewThreads/Messages';
import NewPost from 'components/ReviewThreads/Messages/NewPost';
import UserContext from "context/UserContext";

const Thread = ({ review, type, fetchReviews }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { messages, language } = review;
  const [newPost, setNewPost] = useState(false);

  const handleNewPost = () => {
    try {
      setNewPost(true);
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <Paper className={classes.singleView}>
      <ThreadHeader type={type} review={review} fetchReviews={fetchReviews} />

      <div className={classes.syntaxWrapper}>
        {messages.map((message) => (
          <Box mb={5}>
            <Messages
              reviewId={review._id}
              key={message._id}
              message={message}
              language={language}
              fetchReviews={fetchReviews}
            />
            <Divider />
          </Box>
        ))}
        {(user.id === review.requesterId || review.status === "accepted") && (
          !newPost ? (
            <div className={classes.addPost}>
              <Button className={classes.button} onClick={handleNewPost}>Add Post</Button>
            </div>
          ) : (
            <NewPost
              reviewId={review._id}
              language={language}
              setNewPost={setNewPost}
            />
          )
        )}
      </div>
    </Paper>
  );
};

export default Thread;
