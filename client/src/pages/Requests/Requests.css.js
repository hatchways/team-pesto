import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  MainWrapper: {
    display: "grid",
    gridTemplateRows: "64px 1fr",
    backgroundColor: `${theme.palette.background.main}`,
  },
  contentWrapper: {
    display: "grid",
    gridTemplateColumns: "20vw 1fr",
    gridRowStart: 2,
    height: "calc(100vh - 64px)",
  },
  sideBar: {
    padding: "3rem",
    boxShadow: "0px 20px 50px 1px #BBBBBB",
    position: "relative",
    overflow: "auto",
  },
  title: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "18px",
  },
  date: {
    color: `${theme.palette.secondary.lightGray}`,
    fontSize: "12px",
  },
  quantity: {
    color: `${theme.palette.primary.main}`,
  },
  cardWrapper: {
    marginTop: "30px",
  },
  link: {
    textDecoration: "none",
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
}));

export default useStyles;
