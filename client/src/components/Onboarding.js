import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import DynamicSelect from "components/DynamicSelect";
import GridTemplateContainer from "pages/GridTemplateContainer";
import LoginSignupContainer from "pages/LoginSignupContainer";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
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
    minHeight: "20px",
    minWidth: "20px",
    fontSize: "15px",
    fontWeight: "bold",
    borderRadius: "50%",
    backgroundColor: "rgba(67, 169, 70, .1)",
    marginRight: "10px"
  },
  addAction: {
    color: "#43DDC1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  ul: {
    padding: 0,
    listStyle: "none"
  }
}));

const Onboarding = () => {
  const classes = useStyles();

  const [languageList, setLanguageList] = useState([
    { language: "", level: "" }
  ]);

  const addLanguage = () => {
    setLanguageList([...languageList, { language: "", level: "" }]);
  };

  const removeLanguage = index => {
    const updatedLanguageList = languageList.slice();
    updatedLanguageList.splice(index, 1);
    setLanguageList(updatedLanguageList);
  };

  const updateList = (userInput, index) => {
    const updatedLanguageList = languageList.slice();
    updatedLanguageList[index] = {
      ...updatedLanguageList[index],
      [userInput.type]: userInput.value
    };
    setLanguageList(updatedLanguageList);
  };

  const submit = event => {
    event.preventDefault();

    console.log("languageList: ", languageList);
  };

  return (
    <LoginSignupContainer>
      <GridTemplateContainer>
        <form onSubmit={submit} className={classes.form}>
          <h1>Add your experience here:</h1>

          <ul className={classes.ul}>
            {languageList.map((data, index) => (
              <DynamicSelect
                key={index}
                index={index}
                data={data}
                updateList={updateList}
                removeLanguage={removeLanguage}
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
