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
    display: "flex",
    justifyContent: "space-between",
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
  editIcon: {
    "&:hover": {
      cursor: "pointer",
    },
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
  editHeader: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "10px",
  },
}));

export default useStyles;