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
    backgroundColor: `${theme.palette.primary.green}`,
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
    color: `${theme.palette.primary.green}`,
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

  const [selecOneError, setSelectOneError] = useState(false);

  const addLanguage = () => {
    setLanguageList([...languageList, { language: "", level: "" }]);
  };

  const removeLanguage = (index, lang) => {
    const updatedLanguageList = languageList.slice();
    updatedLanguageList.splice(index, 1);
    setLanguageList(updatedLanguageList);
  };

  const updateList = (userInput, index) => {
    const updatedLanguageList = languageList.slice();
    updatedLanguageList[index] = {
      ...updatedLanguageList[index],
      [userInput.type]: userInput.value,
    };

    if (
      userInput.type === "language" &&
      languageList.some((obj) => obj.language === userInput.value)
    ) {
      setDuplicateError({ error: true, lang: userInput.value });
    } else {
      setDuplicateError({ error: false, lang: "" });
      setLanguageList(updatedLanguageList);
    }
  };

  const submit = (event) => {
    event.preventDefault();

    if (languageList.some((obj) => obj.language === "" || obj.level === "")) {
      setSelectOneError(false);
      setError(true);
    } else if (languageList.length === 0) {
      setSelectOneError(true);
    } else {
      setSelectOneError(false);
      setError(false);
      console.log("languageList: ", languageList);
    }
  };

  const options = ["JavaScript", "Python", "Java", "C++", "Ruby"];
  const levels = ["Beginner", "Intermediate", "Advanced"];

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

          {selecOneError && (
            <FormHelperText className={classes.formHelper}>
              You must select at least one language.
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
