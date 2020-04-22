import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: `${theme.palette.background.main}`,
  },

  threadContainer: {    
    flexGrow: 1,
    margin: 'auto',
    marginTop: 64,
  },
}));

export default useStyles;
