import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "context/UserContext";
import {
  Typography,
  Avatar,
  Button,
  TextField,
  Portal,
  Snackbar,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import CodeEditor from "components/CodeEditor";
import formatDate from "utils/formatDate";
import { getToken } from "utils/storage";
import useStyle from "components/SingleView/SingleView.css";

const Messages = ({ message, language }) => {
  const classes = useStyle();
  const { user } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const [messageId, setMessageId] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [editedCodeSnippet, setEditedCodeSnippet] = useState(false);
  const [comments, setComments] = useState("");
  const [editedComments, setEditedComments] = useState(false);

  useEffect(() => {
    setMessageId(message["_id"]);
    setCodeSnippet(message.code);
    setComments(message.comments);
  }, [message.code, message.comments]);

  const toggelEditMessage = () => {
    setEditMode(!editMode);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "code-snippet":
        setCodeSnippet(value);
        setEditedCodeSnippet(true);
        break;
      case "comments":
        setComments(value);
        setEditedComments(true);
        break;
      default:
    }
  };

  const handleCodeSnippetChange = (value) => {
    setCodeSnippet(value);
    setEditedCodeSnippet(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!editedComments && !editedCodeSnippet) {
      setSnackbar({
        open: true,
        severity: "warning",
        message: "You must make a change first!",
      });
    } else {
      try {
        setEditMode(!editMode);
        await axios.put(
          `/api/reviews/messages/${messageId}`,
          {
            code: codeSnippet,
            comments: comments,
          },
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );

        setSnackbar({
          open: true,
          severity: "success",
          message: "Update successful!",
        });
      } catch (err) {
        console.error(err);
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
              onClick={toggelEditMessage}
              style={
                message.authorId === user.id
                  ? { display: "block" }
                  : { display: "none" }
              }
            />
          ) : (
            <EditIcon
              className={classes.editIcon}
              onClick={toggelEditMessage}
              style={
                message.authorId === user.id
                  ? { display: "block" }
                  : { display: "none" }
              }
            />
          )}
        </div>

        <div className={classes.syntax}>
          <CodeEditor
            language={language}
            value={codeSnippet}
            readOnly={!editMode}
            onChange={handleCodeSnippetChange}
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
              value={comments}
              onChange={handleFormChange}
              style={editMode ? { display: "block" } : { display: "none" }}
            />
          </div>
        </div>
      </form>

      <Portal>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert variant="filled" severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Portal>
    </>
  );
};

export default Messages;
