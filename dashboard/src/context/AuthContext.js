import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create a separate axios instance that we can configure
const createApiInstance = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });

  // Add request interceptor to attach token to every request
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔐 Token attached to request:', config.url, token.substring(0, 20) + '...');
      } else {
        console.log('⚠️ No token found for request:', config.url);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);
  
  // Create api instance once
  const [api] = useState(() => createApiInstance());

  // Set auth token in localStorage and verify
  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      console.log('✅ Token saved to localStorage:', token.substring(0, 20) + '...');
    } else {
      localStorage.removeItem('token');
      console.log('❌ Token removed from localStorage');
    }
  };

  // Clear error
  const clearError = () => setError(null);

  // Verify token and auto-login
  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('⚠️ No token found for auto-login');
      setLoading(false);
      setInitialized(true);
      return;
    }

    try {
      console.log('🔄 Verifying token...');
      const response = await api.get('/api/auth/verify');
      const { user } = response.data;
      setUser(user);
      setIsAuthenticated(true);
      console.log('✅ Auto-login successful');
    } catch (err) {
      console.error('❌ Token verification failed:', err.response?.data || err.message);
      setAuthToken(null); // Remove invalid token
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  // Signup function
  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/auth/signup', userData);
      const { user, token } = response.data;
      
      setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true, user };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Signup failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/auth/login', credentials);
      const { user, token } = response.data;
      
      setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true, user };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Auto-login on app start
  useEffect(() => {
    verifyToken();
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    initialized,
    signup,
    login,
    logout,
    clearError,
    api,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};