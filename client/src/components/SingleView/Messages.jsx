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

const Messages = ({ message, language, redirectId }) => {
  const classes = useStyle();
  const { user } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState({
    open: false,
    message: "",
  });
  const [successSnackbar, setSuccessSnackbar] = useState({
    open: false,
    message: "",
  });
  const [messageId, setMessageId] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [editedCodeSnippet, setEditedCodeSnippet] = useState("");
  const [comments, setComments] = useState("");
  const [editedComments, setEditedComments] = useState("");

  useEffect(() => {
    setMessageId(message["_id"]);
    setCodeSnippet(message.code);
    setComments(message.comments);
    setEditedCodeSnippet(message.code);
    setEditedComments(message.comments);
  }, [message.code, message.comments]);

  const editMessage = () => {
    setEditMode(!editMode);
  };

  const dontEditMessage = () => {
    setEditMode(!editMode);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "code-snippet":
        setEditedCodeSnippet(value);
        break;
      case "comments":
        setEditedComments(value);
        break;
      default:
    }
  };

  const handleCodeSnippetChange = (value) => {
    setEditedCodeSnippet(value);
  };

  const handleErrorSnackbarClose = () => {
    setErrorSnackbar({
      open: false,
      message: errorSnackbar.message,
    });
  };

  const handleSuccessSnackbarClose = () => {
    setSuccessSnackbar({
      open: false,
      message: successSnackbar.message,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestId = redirectId;

    if (editedCodeSnippet !== codeSnippet) {
      setCodeSnippet(editedCodeSnippet);
    }

    if (editedComments !== comments) {
      setComments(editedComments);
    }

    if (editedComments === comments && editedCodeSnippet === codeSnippet) {
      setErrorSnackbar({
        open: true,
        message: "You must make a change first!",
      });
    } else {
      try {
        setEditMode(!editMode);
        await axios.put(
          `/api/reviews/${requestId}`,
          {
            requestId,
            messageId: messageId,
            code: editedCodeSnippet,
            comments: editedComments,
          },
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );

        setSuccessSnackbar({ open: true, message: "Update successful!" });
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
            <CloseIcon className={classes.editIcon} onClick={dontEditMessage} />
          ) : (
            <EditIcon className={classes.editIcon} onClick={editMessage} />
          )}
        </div>

        <div className={classes.syntax}>
          <CodeEditor
            language={language}
            value={editMode ? editedCodeSnippet : codeSnippet}
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
              value={editMode ? editedComments : comments}
              onChange={handleFormChange}
              style={editMode ? { display: "block" } : { display: "none" }}
            />
          </div>
        </div>
      </form>

      <Portal>
        <Snackbar
          open={errorSnackbar.open}
          autoHideDuration={5000}
          onClose={handleErrorSnackbarClose}
        >
          <Alert variant="filled" severity="warning">
            {errorSnackbar.message}
          </Alert>
        </Snackbar>
      </Portal>

      <Portal>
        <Snackbar
          open={successSnackbar.open}
          autoHideDuration={5000}
          onClose={handleSuccessSnackbarClose}
        >
          <Alert variant="filled" severity="success">
            {successSnackbar.message}
          </Alert>
        </Snackbar>
      </Portal>
    </>
  );
};

export default Messages;
