import React from 'react';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-tomorrow";

const CodeEditor = ({ language, theme, value }) => {
  const defaultLanguage = 'python';
  const defaultValue = '';

  let aceTheme;
  switch (theme) {
    case 'dark':
      aceTheme = 'twilight';
      break;
    case 'light':
    default:
      aceTheme = 'tomorrow';
      break;
  }

  return (
    <AceEditor
      fontSize={16}
      mode={language || defaultLanguage}
      theme={aceTheme}
      value={value || defaultValue}
      hightlightActiveLine={true}
      showPrintMargin={false}
      width='100%'
      setOptions={{ useWorker: false }}
    />
  );
};

export default CodeEditor;
