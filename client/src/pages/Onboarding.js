import React, { useState } from "react";
import { Button } from "@material-ui/core";

import DynamicSelect from "./DynamicSelect";

const Onboarding = () => {
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
    <form onSubmit={submit} className="SignUpForm">
      <h1>Add your experience here:</h1>

      <ul>
        {inputs.map((data, index) => (
          <DynamicSelect key={index} index={index} updateList={updateList} />
        ))}
      </ul>

      <div>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={addLanguage}
        >
          +
        </Button>
        <div>Add language</div>
      </div>

      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </form>
  );
};

export default Onboarding;
