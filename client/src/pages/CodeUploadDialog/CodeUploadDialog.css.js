import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    "& label.Mui-focused": {
      color: theme.palette.primary.dark,
    },

    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.dark,
      },
    },
  },
}));

export default useStyles;
