// eslint-disable-next-line
import React from 'react';
import ReactDom from 'react-dom';
import Root from './containers/Root';
import registerServiceWorker from './registerServiceWorker';

ReactDom.render(
  <Root />,
  document.getElementById('root')
);
registerServiceWorker();
