import { makeStyles } from '@material-ui/core';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  reviewSidebarPaper: {
    width: drawerWidth,
    padding: '3rem',
  },

  title: {
    margin: '50px 0 30px 0',
  },

  quantity: {
    color: `${theme.palette.primary.main}`,
  },

  link: {
    '&:hover': {
      textDecoration: 'none',
    }
  },

  card: {
    padding: "20px",
    borderRadius: "4px",
    boxShadow: "none",
    marginBottom: "20px",
    "&:hover": {
      cursor: "pointer",
      borderColor: `${theme.palette.secondary.main}`,
    },
  },

  reviewTitle: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "18px",
  },

  date: {
    color: `${theme.palette.secondary.lightGray}`,
    fontSize: "12px",
  },
}));

export default useStyles;
