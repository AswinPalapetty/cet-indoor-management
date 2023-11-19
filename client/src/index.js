import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import StudentContext from './contexts/StudentContext';
import StaffContext from './contexts/StaffContext';
import CartContext from './contexts/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StaffContext>
    <StudentContext>
      <CartContext>
        <Router>
          <App />
        </Router>
      </CartContext>
    </StudentContext>
  </StaffContext>
);
