import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';



import MyProvider from './MyProvider';
import './firebase';





ReactDOM.render(
  <MyProvider>
      <App />
  </MyProvider>,
  document.getElementById('root')
);

