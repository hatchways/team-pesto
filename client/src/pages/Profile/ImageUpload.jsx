import React, { useCallback, useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import AppSnackbarContext from "context/AppSnackbarContext";
import { getToken } from "../../utils/storage";

const useStyle = makeStyles((theme) => ({
  dropBox: {
    backgroundColor: `${theme.palette.primary.superLight}`,
    border: `dashed 2px ${theme.palette.primary.main}`,
    color: `${theme.palette.primary.main}`,
    height: 100,
    padding: 30,
    minWidth: "335px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
}));

const ImageUpload = ({ open, onClose }) => {
  const classes = useStyle();
  const { setSnackbar } = useContext(AppSnackbarContext);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (acceptedFiles.length > 1) {
      setSnackbar({
        open: true,
        severity: "warning",
        message: "Please upload only one file!",
      });
    } else if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/tiff"
    ) {
      setSnackbar({
        open: true,
        severity: "warning",
        message: "Please upload image files only!",
      });
    } else {
      const formData = new FormData();
      formData.append("file", file);

      setIsLoading(true);
      const { data } = await axios.post("/api/users/upload", formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      onClose();
      setSnackbar({
        open: true,
        severity: "success",
        message: "Successfully updated profile picture",
      });
      setIsLoading(false);
    }
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
            <div className={classes.dropBox}>
              "Drop the image file here ..."
            </div>
          ) : (
            <div className={classes.dropBox}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                "Drag 'n' drop image file here, or click to select a file"
              )}
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
