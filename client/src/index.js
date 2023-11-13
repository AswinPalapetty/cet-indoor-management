import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import StudentContext from './contexts/StudentContext';
import StaffContext from './contexts/StaffContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StaffContext>
    <StudentContext>
      <Router>
        <App />
      </Router>
    </StudentContext>
  </StaffContext>
);
