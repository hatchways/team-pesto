import React, { useCallback } from "react";
import UserContext from "context/UserContext";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { getToken } from "../../utils/storage";

const useStyle = makeStyles((theme) => ({
  dropBox: {
    backgroundColor: `${theme.palette.secondary.light}`,
    border: `1px dashed ${theme.palette.secondary.main}`,
    height: 100,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const ImageUpload = ({ open, onClose }) => {
  const classes = useStyle();

  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    const { data } = await axios.post("/api/users/upload", formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    onClose();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Update your profile picture
      </DialogTitle>
      <DialogContent>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className={classes.dropBox}>Drop the image file here ...</div>
          ) : (
            <div className={classes.dropBox}>
              Drag 'n' drop image file here, or click to select a file
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <div>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ImageUpload;
