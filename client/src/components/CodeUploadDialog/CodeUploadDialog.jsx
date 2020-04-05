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
import CodeEditor from '../CodeEditor';

const CodeUploadDialog = () => {
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

  const [ open, setOpen ] = useState(true);
  const [ title, setTitle ] = useState('');
  const [ language, setLanguage ] = useState(defaultLanguage);

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = event => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleLanguageChange = event => {
    event.preventDefault();
    setLanguage(event.target.value);
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
      onClose={handleClose}
      fullScreen={useMediaQuery(theme.breakpoints.down('xs'))}
    >
      <Box width='80%' mx='auto' py={4}>
        <h2 className={classes.header}>Request a code review</h2>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              variant='outlined'
              label='Title'
              InputLabelProps={{ shrink: true }}
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
        <CodeEditor language={language} theme='dark' />
      </Box>
    </Dialog>
  );
};

export default CodeUploadDialog;
