import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DynamicSelect from "pages/DynamicSelect";

const useStyle = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  ul: {
    padding: 0,
    listStyle: "none",
  },
  dialogContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const EditProfile = ({
  open,
  onClose,
  handleFormChange,
  handleSubmit,
  setSnackbar,
  name,
  title,
  years,
  experience,
  options,
  levels,
  setEditedExperience,
  image,
}) => {
  const classes = useStyle();

  const addLanguage = () => {
    setEditedExperience([...experience, { language: "", level: "" }]);
  };

  const removeLanguage = (index, lang) => {
    const updatedLanguageList = experience.slice();
    updatedLanguageList.splice(index, 1);
    setEditedExperience(updatedLanguageList);
  };

  const updateList = (userInput, index) => {
    const updatedLanguageList = experience.slice();
    updatedLanguageList[index] = {
      ...updatedLanguageList[index],
      [userInput.type]: userInput.value,
    };

    if (
      userInput.type === "language" &&
      experience.some((obj) => obj.language === userInput.value)
    ) {
      setSnackbar({
        open: true,
        severity: "warning",
        message: `You already selected ${userInput.value}!`,
      });
    } else {
      setEditedExperience(updatedLanguageList);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update your Profile</DialogTitle>
        <DialogContent className={classes.content}>
          <TextField
            name="name"
            label="Your name"
            InputLabelProps={{ shrink: true }}
            value={name}
            onChange={handleFormChange}
            className={classes.textField}
          />

          <TextField
            name="title"
            label="Your title"
            InputLabelProps={{ shrink: true }}
            value={title}
            onChange={handleFormChange}
            className={classes.textField}
          />

          <TextField
            name="years"
            label="Years of experience"
            InputLabelProps={{ shrink: true }}
            value={years}
            onChange={handleFormChange}
            className={classes.inputField}
            className={classes.textField}
          />

          <ul className={classes.ul}>
            {experience.map((languageObj, index) => (
              <DynamicSelect
                key={index}
                index={index}
                options={options}
                levels={levels}
                languageObj={languageObj}
                languageList={experience}
                updateList={updateList}
                removeLanguage={removeLanguage}
              />
            ))}
          </ul>
        </DialogContent>
        <DialogActions className={classes.dialogContent}>
          <Button onClick={addLanguage} color="primary">
            Add another Language
          </Button>
          <div>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfile;
