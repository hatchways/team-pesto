import React, { useState } from 'react';
import { 
  Dialog,
  Box,
  Grid,
  TextField,
  MenuItem,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import useStyles from './CodeUploadDialog.css';
import CodeEditor from 'components/CodeEditor';
import SubmitButton from 'components/ui/SubmitButton';

const CodeUploadDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const classes = useStyles();

  const languages = {
    python: 'Python',
    java: 'Java',
    c_cpp: 'C++',
    javascript: 'JavaScript',
    ruby: 'Ruby',
  };
  const defaultLanguage = Object.keys(languages)[0];

  const [ title, setTitle ] = useState('');
  const [ language, setLanguage ] = useState(defaultLanguage);
  const [ codeSnippet, setCodeSnippet ] = useState('');
  const [ comments, setComments ] = useState('');

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleLanguageChange = event => {
    setLanguage(event.target.value);
  };

  const handleCodeSnippetChange = value => {
    setCodeSnippet(value);
  };

  const handleCommentsChange = event => {
    setComments(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const renderLanguageChoices = () => {
    return Object.keys(languages).map(k => (
      <MenuItem key={k} value={k}>
        {languages[k]}
      </MenuItem>
    ));
  };

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={open}
      onClose={onClose}
      fullScreen={useMediaQuery(theme.breakpoints.down('xs'))}
    >
      <form className={classes.form} onSubmit={handleSubmit}>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          width='80%'
          mx='auto'
          py={4}          
        >
          <Box mb={6}>
            <h2 className={classes.header}>
              Request a code review
            </h2>
          </Box>

          <Box mb={3} width='100%'>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField
                  variant='outlined'
                  label='Title'
                  InputLabelProps={{ shrink: true }}
                  color='primary'
                  fullWidth
                  value={title}
                  onChange={handleTitleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  select
                  variant='outlined'
                  label='Language'
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={language}
                  onChange={handleLanguageChange}
                >
                  {renderLanguageChoices()}
                </TextField>
              </Grid>
            </Grid>
          </Box>

          <CodeEditor
            language={language}
            theme='dark'
            value={codeSnippet}
            onChange={handleCodeSnippetChange}
          />

          <Box my={3} width='100%'>
            <TextField
              variant='outlined'
              label='Additional Comments'
              InputLabelProps={{ shrink: true }}
              fullWidth
              multiline
              rows={5}
              value={comments}
              onChange={handleCommentsChange}
            />
          </Box>

          <Box mt={3} mb={2}>
            <SubmitButton>Submit</SubmitButton>
          </Box>
        </Box>
      </form>
    </Dialog>
  );
};

export default CodeUploadDialog;
