import React, { useContext } from "react";
import UserContext from "context/UserContext";
import { Typography, Avatar } from "@material-ui/core";
import CodeEditor from "components/CodeEditor";
import formatDate from "utils/formatDate";
import useStyle from "components/Reviews/SingleView.css";

const Messages = ({ message, language, editMode }) => {
  const classes = useStyle();
  const { user } = useContext(UserContext);

  return (
    <div key={message["_id"]}>
      <div className={classes.syntax}>
        <CodeEditor
          language={language}
          value={message.code}
          readOnly={!editMode}
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
  );
};

export default Messages;
