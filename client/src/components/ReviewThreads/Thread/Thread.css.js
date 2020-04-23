import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  singleViewWrapper: {
    overflow: "auto",
  },

  singleView: {
    margin: "50px",
    position: "relative",
    overflow: "auto",
  },

  header: {
    padding: "40px",
    borderBottom: `1px solid ${theme.palette.secondary.lightGray}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerActionButton: {
    margin: '0 4px',
  },

  title: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "20px",
  },

  syntaxWrapper: {
    padding: "3rem",
  },
}));

export default useStyles;
