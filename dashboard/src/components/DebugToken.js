import React from 'react';
import { useAuth } from '../context/AuthContext';

const DebugToken = () => {
  const { user, isAuthenticated, initialized, api } = useAuth();

  const testToken = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('🔍 Current token:', token);
      
      // Test the verify endpoint
      const response = await api.get('/api/auth/verify');
      console.log('✅ Token test successful:', response.data);
      
      // Test a protected endpoint
      const fundsResponse = await api.get('/api/funds');
      console.log('✅ Funds test successful:', fundsResponse.data);
      
    } catch (err) {
      console.error('❌ Token test failed:', err.response?.data || err.message);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: '#f0f0f0', 
      padding: '10px', 
      border: '1px solid #ccc',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <div>Auth: {initialized ? '✅' : '⏳'}</div>
      <div>Logged in: {isAuthenticated ? '✅' : '❌'}</div>
      <div>User: {user?.email || 'None'}</div>
      <button onClick={testToken} style={{ marginTop: '5px', fontSize: '10px' }}>
        Test Token
      </button>
    </div>
  );
};

export default DebugToken;