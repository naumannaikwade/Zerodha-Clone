import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const StockContext = createContext();

export const useStocks = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStocks must be used within a StockProvider');
  }
  return context;
};

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  const { api, initialized } = useAuth(); // ✅ Get initialization status

  const fetchStocks = async () => {
    try {
      console.log('🔄 Fetching stocks...');
      const response = await api.get('/api/stocks');
      console.log('✅ Stocks fetched:', response.data.length, 'stocks');
      setStocks(response.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('❌ Error fetching stocks:', err.response?.data || err.message);
      setStocks([]);
    }
  };

  const fetchPortfolio = async () => {
    try {
      console.log('🔄 Fetching portfolio...');
      const token = localStorage.getItem('token');
      console.log('📝 Current token:', token ? 'Present' : 'Missing');
      
      const response = await api.get('/api/holdings');
      console.log('✅ Portfolio fetched:', response.data.length, 'holdings');
      setPortfolio(response.data || []);
    } catch (err) {
      console.error('❌ Failed to fetch holdings:', err.response?.data || err.message);
      console.log('🔍 Error details:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data
      });
      setPortfolio([]);
    }
  };

  useEffect(() => {
    // ✅ Only fetch data after AuthContext is initialized
    if (!initialized) {
      console.log('⏳ Waiting for AuthContext to initialize...');
      return;
    }

    const initializeData = async () => {
      setLoading(true);
      try {
        console.log('🚀 Initializing stock data...');
        await Promise.all([fetchStocks(), fetchPortfolio()]);
      } catch (error) {
        console.error('❌ Initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();

    const interval = setInterval(fetchStocks, 300000);
    return () => clearInterval(interval);
  }, [initialized]); // ✅ Depend on initialized status

  const value = {
    stocks,
    portfolio,
    loading,
    lastUpdated,
    refreshStocks: fetchStocks,
    refreshPortfolio: fetchPortfolio,
  };

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
};