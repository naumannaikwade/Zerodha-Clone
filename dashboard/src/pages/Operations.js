import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import Orders from '../components/Orders';
import Holdings from '../components/Holdings';
import Positions from '../components/Positions';
import Funds from '../components/Funds';
import Apps from '../components/Apps';

const Operations = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Navbar with logo, links, and user ID */}
      <Navbar />

      {/* Routed content area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Routes>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
          {/* Redirect to home by default */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Operations;