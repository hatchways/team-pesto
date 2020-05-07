import React, { useState, useContext } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Dialog,
  Box,
  IconButton,
  Grid,
  TextField,
  MenuItem,
  useMediaQuery,
  CircularProgress,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

import useStyles from "./CodeUploadDialog.css";
import AppSnackbarContext from 'context/AppSnackbarContext';
import CodeEditor from "components/CodeEditor";
import SubmitButton from "components/SubmitButton";
import { getToken } from "utils/storage";

const CodeUploadDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const classes = useStyles();

  const languages = {
    python: "Python",
    java: "Java",
    cpp: "C++",
    javascript: "JavaScript",
    ruby: "Ruby",
  };
  const defaultLanguage = Object.keys(languages)[0];

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState(defaultLanguage);
  const [codeSnippet, setCodeSnippet] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const { setSnackbar } = useContext(AppSnackbarContext);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "language":
        setLanguage(value);
        break;
      case "code-snippet":
        setCodeSnippet(value);
        break;
      case "comments":
        setComments(value);
        break;
      default:
    }
  };

  const submitDisabled = !language || !codeSnippet;

  const handleCodeSnippetChange = (value) => {
    setCodeSnippet(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitDisabled) return;

    setLoading(true);
    try {
      await axios.post(
        "/api/reviews/requests",
        {
          title,
          language,
          code: codeSnippet,
          comments,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      setSnackbar({
        open: true,
        severity: 'success',
        message: "Submitted code for review!"
      });
      onClose();
    } catch (err) {
      const message = err.response.data.response || err.response.data;
      setSnackbar({ open: true, severity: 'error', message });
    }
    setLoading(false);
  };

  const renderLanguageChoices = () => {
    return Object.keys(languages).map((k) => (
      <MenuItem key={k} value={k}>
        {languages[k]}
      </MenuItem>
    ));
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={onClose}
        fullScreen={useMediaQuery(theme.breakpoints.down("xs"))}
      >
        <Box
          display={{ xs: "block", sm: "none" }}
          position="fixed"
          top={1}
          right={1}
        >
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="80%"
            mx="auto"
            py={4}
          >
            <Box mb={6}>
              <h2 className={classes.header}>Request a code review</h2>
            </Box>

            <Box mb={3} width="100%">
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    InputLabelProps={{ shrink: true }}
                    color="primary"
                    fullWidth
                    value={title}
                    onChange={handleFormChange}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    name="language"
                    select
                    variant="outlined"
                    label="Language"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={language}
                    onChange={handleFormChange}
                  >
                    {renderLanguageChoices()}
                  </TextField>
                </Grid>
              </Grid>
            </Box>

            <CodeEditor
              language={language}
              theme="dark"
              value={codeSnippet}
              onChange={handleCodeSnippetChange}
            />

            <Box my={3} width="100%">
              <TextField
                name="comments"
                variant="outlined"
                label="Additional Comments"
                InputLabelProps={{ shrink: true }}
                fullWidth
                multiline
                rows={5}
                value={comments}
                onChange={handleFormChange}
              />
            </Box>

            <Box mt={3} mb={2}>
              <SubmitButton disabled={submitDisabled || loading}>
                {loading ? <CircularProgress size="22px" /> : "Submit"}
              </SubmitButton>
            </Box>
          </Box>
        </form>
      </Dialog>
    </>
  );
};

export default CodeUploadDialog;
