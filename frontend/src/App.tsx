import React from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MaterialsPage from './pages/MaterialsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import './App.css';

function App() {
  // return (<LoginPage />);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        {/* <Route path = "/settings" element={<SettingsPage />} />
        <Route path = "/maps" element={<MapsPage />} />
        <Route path = "/terrains" element={<TerrainsPage />} />
        <Route path = "/materials" element={<MaterialsPage />} />
        <Route path = "/about" element={<AboutPage />} />
        <Route path = "/contact" element={<ContactPage />} /> */}
      </Routes>
    </Router>
  );

}

export default App;
