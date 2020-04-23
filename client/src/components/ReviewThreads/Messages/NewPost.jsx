import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Avatar,
  Button,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";

import useStyle from "./Messages.css";
import UserContext from "context/UserContext";
import AppSnackbarContext from 'context/AppSnackbarContext';
import CodeEditor from "components/CodeEditor";
import formatDate from "utils/formatDate";
import { getToken } from "utils/storage";

const NewPost = ({ reviewId, language, setNewPost }) => {
  const classes = useStyle();
  const { user } = useContext(UserContext);
  const { setSnackbar } = useContext(AppSnackbarContext);
  const [codeSnippet, setCodeSnippet] = useState("");  
  const [comments, setComments] = useState("");

  const handleFormChange = (event) => {
    setComments(event.target.value);
  };

  const handleCodeSnippetChange = (value) => {
    setCodeSnippet(value);
  };

  const handleClose = () => {
    setCodeSnippet("");
    setComments("");
    setNewPost(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!codeSnippet && !comments) {
      setSnackbar({
        open: true,
        severity: "warning",
        message: "You must make a change first!",
      });
    } else {
      try {
        await axios.post(
          `/api/reviews/${reviewId}`,
          {
            code: codeSnippet,
            comments: comments,
          },
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        handleClose();
      } catch (err) {
        const errMessage = err.response.data.response || err.response.data;
        setSnackbar({ open: true, severity: 'error', message: errMessage });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={classes.editHeader}>
          <Button
            variant="contained"
            type="submit"
            className={classes.button}
            style={{ display: "block" }}
          >
            Post
          </Button>
          <CloseIcon
            className={classes.editIcon}
            onClick={() => handleClose()}
            style={{ display: "block" }}
          />
        </div>

        <div className={classes.syntax}>
          <CodeEditor
            language={language}
            value={codeSnippet}
            readOnly={false}
            onChange={handleCodeSnippetChange}
          />
        </div>

        <div className={classes.author}>
          <div className={classes.authorHeader}>
            <div className={classes.authorAvatar}>
              <Avatar src={user.image} />
            </div>
            <div>
              <Link to={`/profile/${user.id}`} className={classes.authorLink}>
                <Typography variant="h5">{user.name}</Typography>
              </Link>
              <Typography className={classes.date}>
                {formatDate(Date.now())}
              </Typography>
            </div>
          </div>
          <div className={classes.authorComment}>
            <TextField
              name="comments"
              variant="outlined"
              label="Additional Comments"
              InputLabelProps={{ shrink: true }}
              fullWidth
              multiline
              rows={5}
              value={comments}
              onChange={handleFormChange}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default NewPost;
