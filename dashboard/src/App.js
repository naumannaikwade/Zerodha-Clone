import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";
import useFundsStore from "./store/useFundsStore";
import useMarketStore from "./store/useMarketStore";
import usePortfolioStore from "./store/usePortfolioStore";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout";

function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const fetchFunds = useFundsStore((state) => state.fetchFunds);
  const fetchStocks = useMarketStore((state) => state.fetchStocks);
  const fetchHoldings = usePortfolioStore((state) => state.fetchHoldings);
  const fetchPositions = usePortfolioStore((state) => state.fetchPositions);
  const fetchOrders = usePortfolioStore((state) => state.fetchOrders);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    Promise.all([
      fetchFunds(),
      fetchStocks(),
      fetchHoldings(),
      fetchPositions(),
      fetchOrders(),
    ]);

    const stockRefreshInterval = setInterval(fetchStocks, 300000);
    return () => clearInterval(stockRefreshInterval);
  }, [
    isAuthenticated,
    fetchFunds,
    fetchStocks,
    fetchHoldings,
    fetchPositions,
    fetchOrders,
  ]);

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
