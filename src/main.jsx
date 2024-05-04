import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import MusicDetailSPage from './MusicDetailSPage.jsx';
import ErrorPage from './ErrorPage.jsx'; // Import the ErrorPage component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/song/:id" element={<MusicDetailSPage />} />
        <Route path="*" element={<ErrorPage />} /> 
      </Routes>
    </Router>
  </React.StrictMode>,
);
