import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  singleView: {
    margin: "50px auto auto",
    width: "80%",
    position: "relative",
  },

  header: {
    padding: "40px",
    borderBottom: `1px solid ${theme.palette.secondary.lightGray}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerActionButton: {
    margin: "0 4px",
  },

  title: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "20px",
  },

  syntaxWrapper: {
    padding: "3rem",
  },

  button: {
    backgroundColor: `${theme.palette.primary.main}`,
    color: "#FFFF",
    marginRight: "10px",
    lineHeight: 1,
    padding: "8px",
  },
  
  addPost: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "10px",
  },

}));

export default useStyles;
