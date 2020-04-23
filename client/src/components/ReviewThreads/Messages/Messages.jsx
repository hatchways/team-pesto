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

const Messages = ({ message, language, reviewId, fetchReviews }) => {
  const classes = useStyle();

  const { user } = useContext(UserContext);
  const { setSnackbar } = useContext(AppSnackbarContext);

  const [editMode, setEditMode] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState(message.code);  
  const [editedCodeSnippet, setEditedCodeSnippet] = useState({
    state: false,
    value: message.code,
  });
  const [comments, setComments] = useState(message.comments);
  const [editedComments, setEditedComments] = useState({
    state: false,
    value: message.comments,
  });

  const toggleEditMessage = () => {
    setEditMode(!editMode);
  };

  const handleCloseEdit = () => {
    toggleEditMessage();
    setEditedCodeSnippet({ state: false, value: codeSnippet });
    setEditedComments({ state: false, value: comments });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "comments":
        setEditedComments({ state: true, value });
        break;
      default:
    }
  };

  const handleCodeSnippetChange = (value) => {
    setEditedCodeSnippet({ state: true, value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!editedComments.state && !editedCodeSnippet.state) {
      setSnackbar({
        open: true,
        severity: "warning",
        message: "You must make a change first!",
      });
    } else {
      try {
        setEditMode(!editMode);
        await axios.put(
          `/api/reviews/${reviewId}/messages/${message._id}`,
          {
            code: editedCodeSnippet.value,
            comments: editedComments.value,
          },
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );

        setCodeSnippet(editedCodeSnippet.value);
        setEditedCodeSnippet({ state: false, value: editedCodeSnippet.value });
        setComments(editedComments.value);
        setEditedComments({ state: false, value: editedComments.value });

        setSnackbar({
          open: true,
          severity: "success",
          message: "Update successful!",
        });
        fetchReviews();
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
            onSubmit={handleSubmit}
            className={classes.saveButton}
            style={editMode ? { display: "block" } : { display: "none" }}
          >
            Save
          </Button>

          {editMode ? (
            <CloseIcon
              className={classes.editIcon}
              onClick={handleCloseEdit}
              style={
                message.author._id == user.id
                  ? { display: "block" }
                  : { display: "none" }
              }
            />
          ) : (
            <EditIcon
              className={classes.editIcon}
              onClick={toggleEditMessage}
              style={
                message.author._id == user.id
                  ? { display: "block" }
                  : { display: "none" }
              }
            />
          )}
        </div>

        <div className={classes.syntax}>
          <CodeEditor
            language={language}
            value={editMode ? editedCodeSnippet.value : codeSnippet}
            readOnly={!editMode}
            onChange={handleCodeSnippetChange}
          />
        </div>

        <div className={classes.author}>
          <div className={classes.authorHeader}>
            <div className={classes.authorAvatar}>
              <Avatar src={message.author.image} />
            </div>
            <div>
              <Link to={`/profile/${message.author.id}`} className={classes.authorLink}>
                <Typography variant="h5">{message.author.name}</Typography>
              </Link>
              <Typography className={classes.date}>
                {formatDate(message.date)}
              </Typography>
            </div>
          </div>
          <div className={classes.authorComment}>
            <Typography
              style={editMode ? { display: "none" } : { display: "block" }}
            >
              {comments}
            </Typography>

            <TextField
              name="comments"
              variant="outlined"
              label="Additional Comments"
              InputLabelProps={{ shrink: true }}
              fullWidth
              multiline
              rows={5}
              value={!editMode ? comments : editedComments.value}
              onChange={handleFormChange}
              style={editMode ? { display: "block" } : { display: "none" }}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default Messages;
