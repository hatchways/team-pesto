import React, { useCallback, useState } from "react";
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

const useStyle = makeStyles((theme) => ({}));

const ImageUpload = ({ open, onClose }) => {
  const classes = useStyle();
  const [imageFile, setImageFile] = useState("");

  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    await axios.post("/api/users/upload", formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
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
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
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
