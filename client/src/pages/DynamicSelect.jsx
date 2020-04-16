import React from "react";
import {
  makeStyles,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "25ch",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  circleButton: {
    color: "#ff0011",
    minHeight: "20px",
    minWidth: "20px",
    fontSize: "15px",
    fontWeight: "bold",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 0, 17, .1)",
    marginRight: "10px",
  },
  li: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  select: {
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "yellow !important",
    },
  },
}));

const DynamicSelect = ({
  updateList,
  languageObj,
  index,
  removeLanguage,
  options,
  levels,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;

    updateList({ type: name, value: value }, index);
  };

  const remove = () => {
    removeLanguage(index, languageObj.language);
  };

  return (
    <li className={classes.li}>
      <Button
        type="button"
        variant="contained"
        className={classes.circleButton}
        onClick={remove}
      >
        -
      </Button>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="language">Language</InputLabel>
        <Select
          labelId="language"
          id="language"
          name="language"
          value={languageObj.language}
          onChange={handleChange}
          label="Language"
          className={classes.select}
        >
          {// eslint-disable-next-line
          Object.keys(options).map((key) => {
            return (
              <MenuItem key={key} value={key}>
                {options[key]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="level">Level</InputLabel>
        <Select
          labelId="level"
          id="level"
          name="level"
          value={languageObj.level}
          onChange={handleChange}
          label="Level"
        >
          {Object.keys(levels).map((key) => (
            <MenuItem key={key} value={parseInt(key)}>
              {levels[key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </li>
  );
};

export default DynamicSelect;
