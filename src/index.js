import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import SettingsPage from './components/SettingsPage'; // Import SettingsPage component
import App from './App';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<SettingsPage />} /> {/* Default route to SettingsPage */}
      <Route path="/game" element={<App />} /> {/* Route to Game component */}
    </Routes>
  </Router>,
  document.getElementById('root')
); 