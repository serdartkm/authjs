import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import EmailPasswordProvider from '@authjs/react'
ReactDOM.render(
  <div>
    <EmailPasswordProvider>
    <App/>
    </EmailPasswordProvider>

  </div>,
  document.getElementById('root')
);