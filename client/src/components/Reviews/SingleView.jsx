import React, { useEffect } from "react";
import Prism from "prismjs";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import formatDate from "utils/formatDate";
import "utils/prism.css";

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
  },
}));

const SingleView = (props) => {
  const classes = useStyles();
  console.log(props.singleRequestView);
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
        <br />
        <Typography className={classes.date}>{formatDate(date)}</Typography>
      </div>
      <div className={classes.codeSyntax}>
        {messages.map((message) => (
          <pre>
            <code className={`language-${language}`}>{`${message.code}`}</code>
          </pre>
        ))}
      </div>
    </Paper>
  );
};

export default SingleView;
