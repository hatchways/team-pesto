import React, { useEffect, useContext } from "react";
import Prism from "prismjs";
import { Paper, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "context/UserContext";
import formatDate from "utils/formatDate";
import "utils/prism.css";
import theme from "themes/theme";

const useStyles = makeStyles((theme) => ({
  singleView: {
    margin: "50px;",
    position: "relative",
    overflow: "auto",
  },
  header: {
    padding: "40px",
    borderBottom: `1px solid ${theme.palette.secondary.lightGray}`,
  },
  title: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "20px",
  },
  date: {
    color: `${theme.palette.secondary.lightGray}`,
    fontSize: "12px",
  },
  syntaxWrapper: {
    padding: "3rem",
  },
  syntax: {
    maxHeight: "400px",
    overflow: "auto",
  },
  authorHeader: {
    display: "flex",
    margin: "3rem 0 1rem 0",
  },
  authorAvatar: {
    marginRight: "1rem",
  },
  authorComment: {
    paddingLeft: "55px",
  },
}));

const SingleView = (props) => {
  const classes = useStyles();
  console.log(props.singleRequestView);

  const { user } = useContext(UserContext);
  const { title, date, messages, language } = props.singleRequestView;

  useEffect(() => {
    Prism.highlightAll();
  }, [props]);

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
              <pre style={{ backgroundColor: "#f5f6f9" }}>
                <code
                  className={`language-${language}`}
                >{`${message.code}`}</code>
              </pre>
            </div>

            <div className={classes.author}>
              <div className={classes.authorHeader}>
                <div className={classes.authorAvatar}>
                  <Avatar src={user && user.image} />
                </div>
                <div>
                  <Typography variant="h5">John Doe</Typography>
                  <Typography>Senior Developer</Typography>
                </div>
              </div>
              <div className={classes.authorComment}>
                <Typography>Some comment from the author...</Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default SingleView;
