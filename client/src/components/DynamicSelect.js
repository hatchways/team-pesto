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
    minWidth: "20ch"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const DynamicSelect = ({ updateList, data, index }) => {
  const classes = useStyles();

  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");

  const handleChange = event => {
    const { name, value } = event.target;

    // eslint-disable-next-line
    switch (name) {
      case "language":
        setLanguage(value);
        break;
      case "level":
        setLevel(value);
        break;
    }

    if (language && level) {
      console.log("dynamicSelect: ", language, level);
      updateList({ [language]: level }, index);
    }
  };

  return (
    <li>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="language">Language</InputLabel>
        <Select
          labelId="language"
          id="language"
          name="language"
          value={language}
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
          value={level}
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
