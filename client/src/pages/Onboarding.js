import React, { useState } from "react";
import { makeStyles, Button, Grid } from "@material-ui/core";
import DynamicSelect from "./DynamicSelect";

const useStyles = makeStyles(theme => ({
  grid: {
    flexGrow: 1
  },
  button: {
    marginTop: 15,
    marginBottom: 60,
    borderRadius: 20,
    color: "#FFFFFF",
    backgroundColor: "#43DDC1",
    width: "15ch",
    padding: 10
  },
  link: {
    color: "purple",
    textDecoration: "none"
  },
  h1: {
    fontSize: "xx-large"
  },
  circleButton: {
    color: "#43DDC1",
    mimHeight: "30px",
    minWidth: "30px",
    fontSize: "15px",
    fontWeight: "bold",
    borderRadius: "50%",
    backgroundColor: "rgba(67, 169, 70, .1)"
  },
  addAction: {
    color: "#43DDC1"
  },
  ul: {
    padding: 0,
    listStyle: "none"
  }
}));

const Onboarding = () => {
  const classes = useStyles();

  const [inputs, setInputs] = useState([{}]);
  const [userInputs, setUserInputs] = useState([]);

  const addLanguage = () => {
    setInputs([
      ...inputs,
      { language: "Select a language", level: "Select a level" }
    ]);
  };

  const updateList = userInput => {
    setUserInputs([...userInputs, userInput]);
  };

  const submit = event => {
    event.preventDefault();

    console.log(userInputs);
    console.log(inputs);
  };

  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <form onSubmit={submit}>
            <h1>Add your experience here:</h1>

            <ul className={classes.ul}>
              {inputs.map((data, index) => (
                <DynamicSelect
                  key={index}
                  index={index}
                  updateList={updateList}
                />
              ))}
            </ul>

            <div className={classes.addAction}>
              <Button
                type="button"
                variant="contained"
                className={classes.circleButton}
                onClick={addLanguage}
              >
                +
              </Button>
              <div>Add language</div>
            </div>

            <Button
              className={classes.button}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Onboarding;
