import React from 'react';
import ReactDOM from 'react-dom';

import CodeUploadDialog from './CodeUploadDialog';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CodeUploadDialog />, div);
});
