import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  MainWrapper: {
    width: "100%",
    height: "100%",
  },
  headerWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    borderBottom: `1px solid ${theme.palette.secondary.superLightGray}`,
  },
  subHeaderWrapper: {
    transform: "translate(0, -60px)",
    gridColumn: 2,
    justifySelf: "center",
    textAlign: "center",
    marginBottom: "-2rem",
  },
  avatarWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  userAvatar: {
    width: "3.5rem",
    height: "3.5rem",
  },
  contentWrapper: {
    display: "grid",
    gridTemplateRows: "repeat(2, 1fr) 1fr",
    gridRowGap: "2rem",
    justifyItems: "center",
    marginTop: "2rem",
  },
  text: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
  },
  decorativeText: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    color: `${theme.palette.primary.main}`,
    fontSize: "24px",
    fontWeight: "bold",
  },
  gridRow2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
    alignItems: "center",
    width: "100%",
    borderBottom: `1px solid ${theme.palette.secondary.superLightGray}`,
    paddingBottom: "2rem",
  },
  gridRow3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
    alignItems: "center",
    width: "100%",
    borderBottom: `1px solid ${theme.palette.secondary.superLightGray}`,
    paddingBottom: "2rem",
  },
  inputField: {
    "& .MuiInputBase-input": {
      textAlign: "center",
    },
  },
  editHeader: {
    textAlign: "right",
  },
  editIcon: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  title: {
    color: `${theme.palette.secondary.lightGray}`,
  },
}));

export default useStyles;
