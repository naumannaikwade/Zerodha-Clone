import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FundsContext = createContext();

export const useFunds = () => {
  const context = useContext(FundsContext);
  if (!context) {
    throw new Error('useFunds must be used within a FundsProvider');
  }
  return context;
};

export const FundsProvider = ({ children }) => {
  const [funds, setFunds] = useState({ equity: 0, commodity: 0, currency: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { api, initialized } = useAuth(); // ✅ Get initialization status

  // Fetch funds from backend
  const fetchFunds = useCallback(async () => {
    // ✅ Don't fetch if not initialized
    if (!initialized) {
      console.log('⏳ Waiting for AuthContext to initialize before fetching funds...');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Fetching funds...');
      const response = await api.get('/api/funds');
      console.log('✅ Funds fetched:', response.data);
      setFunds(response.data);
      setTransactions(response.data.transactions || []);
    } catch (err) {
      console.error('Funds fetch error:', err);
      setError(err.response?.data?.message || 'Failed to fetch funds');
      setFunds({ equity: 0, commodity: 0, currency: 100000 });
    } finally {
      setLoading(false);
    }
  }, [api, initialized]); // ✅ Include initialized in dependencies

  // Auto-fetch funds when AuthContext is initialized
  useEffect(() => {
    if (initialized) {
      console.log('🚀 AuthContext initialized, fetching funds...');
      fetchFunds();
    }
  }, [initialized, fetchFunds]);

  // Add demo funds
  const addDemoFunds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/funds/add-demo');
      setFunds(response.data.funds);
      setTransactions(response.data.funds.transactions);
      return { success: true, message: "Demo funds added successfully" };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to add demo funds';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Helper functions
  const getTotalBalance = useCallback(() => {
    return (funds.equity || 0) + (funds.commodity || 0) + (funds.currency || 0);
  }, [funds]);

  const getTotalMarginUsed = useCallback(() => {
    return (
      Math.floor((funds.equity || 0) * 0.2) +
      Math.floor((funds.commodity || 0) * 0.2) +
      Math.floor((funds.currency || 0) * 0.2)
    );
  }, [funds]);

  const getTotalAvailable = useCallback(() => {
    return getTotalBalance() - getTotalMarginUsed();
  }, [getTotalBalance, getTotalMarginUsed]);

  const clearError = useCallback(() => setError(null), []);

  const value = {
    funds,
    transactions,
    loading,
    error,
    fetchFunds,
    addDemoFunds,
    clearError,
    getTotalBalance,
    getTotalMarginUsed,
    getTotalAvailable,
  };

  return (
    <FundsContext.Provider value={value}>
      {children}
    </FundsContext.Provider>
  );
};