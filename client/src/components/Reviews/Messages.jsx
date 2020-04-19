import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "context/UserContext";
import { Typography, Avatar, Button, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import CodeEditor from "components/CodeEditor";
import formatDate from "utils/formatDate";
import { getToken } from "utils/storage";
import useStyle from "components/Reviews/SingleView.css";

const Messages = ({ message, language, redirectId }) => {
  const classes = useStyle();
  const { user } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestId = redirectId;
    setEditMode(!editMode);

    if (editedCodeSnippet && editedComments) {
      setCodeSnippet(editedCodeSnippet);
      setComments(editedComments);

      try {
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
      } catch (err) {
        console.error(err);
      }
    }

    console.log(codeSnippet, "  ", comments);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.editHeader}>
        <Button
          type="submit"
          onSubmit={handleSubmit}
          style={editMode ? { display: "block" } : { display: "none" }}
        >
          Submit
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
  );
};

export default Messages;
