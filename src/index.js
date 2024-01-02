import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main';

const container = document.getElementById('app');

ReactDOM.createRoot(container).render(
  <Router>
    <Main />
  </Router>
);
