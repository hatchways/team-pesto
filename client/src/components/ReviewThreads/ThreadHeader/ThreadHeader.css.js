import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  headerActionButton: {
    margin: "0 4px",
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
}));

export default useStyles;
