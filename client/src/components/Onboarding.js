import React, { useState } from "react";
import { makeStyles, Button, FormHelperText } from "@material-ui/core";
import DynamicSelect from "components/DynamicSelect";
import GridTemplateContainer from "pages/GridTemplateContainer";
import LoginSignupContainer from "pages/LoginSignupContainer";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 15,
    marginBottom: 60,
    borderRadius: 20,
    color: "#FFFFFF",
    backgroundColor: "#43DDC1",
    width: "15ch",
    padding: 10,
  },
  h1: {
    fontSize: "xx-large",
  },
  circleButton: {
    color: "#43DDC1",
    minHeight: "20px",
    minWidth: "20px",
    fontSize: "15px",
    fontWeight: "bold",
    borderRadius: "50%",
    backgroundColor: "rgba(67, 169, 70, .1)",
    marginRight: "10px",
  },
  addAction: {
    color: "#43DDC1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ul: {
    padding: 0,
    listStyle: "none",
  },
  formHelper: {
    marginBottom: 10,
    color: "#ff0011",
  },
}));

const Onboarding = () => {
  const classes = useStyles();

  const [languageList, setLanguageList] = useState([
    { language: "", level: "" },
  ]);

  const [error, setError] = useState(false);
  const [duplicateError, setDuplicateError] = useState({
    error: false,
    lang: "",
  });

  const addLanguage = () => {
    setLanguageList([...languageList, { language: "", level: "" }]);
  };

  const removeLanguage = (index, lang) => {
    const updatedLanguageList = languageList.slice();
    updatedLanguageList.splice(index, 1);
    setLanguageList(updatedLanguageList);
    setOptions({ ...options, [lang]: true });
  };

  const updateList = (userInput, index) => {
    const updatedLanguageList = languageList.slice();
    updatedLanguageList[index] = {
      ...updatedLanguageList[index],
      [userInput.type]: userInput.value,
    };

    if (userInput.type === "language" && !options[userInput.value]) {
      setDuplicateError({ error: true, lang: userInput.value });
    } else {
      setDuplicateError({ error: false, lang: "" });
      setLanguageList(updatedLanguageList);
    }

    if (userInput.type === "language") {
      updateOptions(userInput.value);
    }
  };

  const submit = (event) => {
    event.preventDefault();

    if (languageList.some((obj) => obj.language === "" || obj.level === "")) {
      setError(true);
    } else {
      setError(false);
      console.log("languageList: ", languageList);
    }
  };

  const [options, setOptions] = useState({
    JavaScript: true,
    Python: true,
    Java: true,
    "C++": true,
    Ruby: true,
  });

  const levels = ["Beginner", "Intermediate", "Advanced"];

  const updateOptions = (lang) => {
    setOptions({ ...options, [lang]: false });
  };

  return (
    <LoginSignupContainer>
      <GridTemplateContainer>
        <form onSubmit={submit} className={classes.form}>
          <h1>Add your experience here:</h1>

          <ul className={classes.ul}>
            {languageList.map((languageObj, index) => (
              <DynamicSelect
                key={index}
                index={index}
                options={options}
                levels={levels}
                languageObj={languageObj}
                languageList={languageList}
                updateList={updateList}
                removeLanguage={removeLanguage}
                error={error}
              />
            ))}
          </ul>

          {error && (
            <FormHelperText className={classes.formHelper}>
              Please fill in all fields, or remove unused fields.
            </FormHelperText>
          )}

          {duplicateError.error && (
            <FormHelperText className={classes.formHelper}>
              Oops, you already selected {duplicateError.lang}!
            </FormHelperText>
          )}

          <div className={classes.addAction}>
            <Button
              type="button"
              variant="contained"
              className={classes.circleButton}
              onClick={addLanguage}
            >
              +
            </Button>
            Add language
          </div>

          <Button className={classes.button} type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </GridTemplateContainer>
    </LoginSignupContainer>
  );
};

export default Onboarding;
