import React, { useState } from "react";
import {
  makeStyles,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "25ch"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  circleButton: {
    color: "#ff0011",
    minHeight: "20px",
    minWidth: "20px",
    fontSize: "15px",
    fontWeight: "bold",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 0, 17, .1)",
    marginRight: "10px"
  },
  li: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const DynamicSelect = ({ updateList, data, index, removeLanguage }) => {
  const classes = useStyles();

  const handleChange = event => {
    const { name, value } = event.target;

    updateList({ type: name, value: value }, index);
  };

  const remove = () => {
    removeLanguage(index);
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
          value={data.language}
          onChange={handleChange}
          label="Language"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="JavaScript">JavaScript</MenuItem>
          <MenuItem value="Python">Python</MenuItem>
          <MenuItem value="Java">Java</MenuItem>
          <MenuItem value="C++">C++</MenuItem>
          <MenuItem value="Ruby">Ruby</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="level">Level</InputLabel>
        <Select
          labelId="level"
          id="level"
          name="level"
          value={data.level}
          onChange={handleChange}
          label="Level"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </Select>
      </FormControl>
    </li>
  );
};

export default DynamicSelect;
