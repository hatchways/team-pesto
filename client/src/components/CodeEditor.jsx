import React from 'react';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-tomorrow";

const CodeEditor = ({ language, theme, value, onChange }) => {
  const modes = {
    python: 'python',
    java: 'java',
    cpp: 'c_cpp',
    javascript: 'javascript',
    ruby: 'ruby',
  };
  const defaultMode = 'python';
  const mode = modes[language] || defaultMode;

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
      mode={mode}
      theme={aceTheme}
      value={value}
      hightlightActiveLine={true}
      showPrintMargin={false}
      width='100%'
      onChange={onChange}
      setOptions={{ useWorker: false }}
      style={{ borderRadius: '5px' }}
    />
  );
};

export default CodeEditor;
