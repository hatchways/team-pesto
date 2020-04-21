import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  singleViewWrapper: {
    overflow: "auto",
  },
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
    height: "28px",
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
  saveButton: {
    backgroundColor: `${theme.palette.primary.main}`,
    color: "#FFFF",
    marginRight: "10px",
    lineHeight: 1,
    padding: "8px",
  },
}));

export default useStyles;
