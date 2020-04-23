import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

  editIcon: {
    height: "28px",
    "&:hover": {
      cursor: "pointer",
    },
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

  authorLink: {
    textDecoration: 'none',
    color: 'black',
  },

  date: {
    color: `${theme.palette.secondary.lightGray}`,
    fontSize: "12px",
  },
  button: {
    backgroundColor: `${theme.palette.primary.main}`,
    color: "#FFFF",
    marginRight: "10px",
    lineHeight: 1,
    padding: "8px",
  },
  authorComment: {
    paddingLeft: "55px",
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    width: '100%',
  },
  addPost: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "10px",
  }
}));

export default useStyles;
