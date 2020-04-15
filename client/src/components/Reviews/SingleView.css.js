import { makeStyles } from "@material-ui/core/styles";

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
  date: {
    color: `${theme.palette.secondary.lightGray}`,
    fontSize: "12px",
  },
}));

export default useStyles;
