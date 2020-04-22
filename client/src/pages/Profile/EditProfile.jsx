import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
}));

const EditProfile = ({
  open,
  onClose,
  handleFormChange,
  handleSubmit,
  name,
  title,
  years,
  experience,
  image,
}) => {
  const classes = useStyle();

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update your Profile</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText>
            Please fill in the options below to update your profile.
          </DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfile;
