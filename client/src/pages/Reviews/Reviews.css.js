import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  reviews: {
    display: 'flex',
  },

  threadContainer: {
    backgroundColor: `${theme.palette.background.main}`,
    flexGrow: 1,
    margin: 'auto',
    marginTop: 64,
  },
}));

export default useStyles;
