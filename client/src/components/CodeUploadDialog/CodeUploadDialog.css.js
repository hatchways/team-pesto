import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    '& label.Mui-focused': {
      color: 'purple',
    },

    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'purple',
      },
    },
  },
});

export default useStyles;
