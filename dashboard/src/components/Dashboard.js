import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFunds } from "../context/FundsContext";
import { useStocks } from "../context/StockContext";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading, initialized: authInitialized } = useAuth();
  const { funds, loading: fundsLoading } = useFunds();
  const { portfolio, loading: stocksLoading } = useStocks();

  console.log("Dashboard rendering - Debug info:", {
    authLoading,
    authInitialized,
    fundsLoading,
    stocksLoading,
    user,
    funds,
    portfolio
  });

  // Show loading if contexts are still initializing
  if (authLoading || !authInitialized || fundsLoading || stocksLoading) {
    return (
      <div className="dashboard-bg">
        <div className="dashboard-container">
          <div className="dashboard-loading">
            <p>Loading dashboard data...</p>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
              <div>Auth: {authInitialized ? '✅' : '⏳'}</div>
              <div>Funds: {!fundsLoading ? '✅' : '⏳'}</div>
              <div>Stocks: {!stocksLoading ? '✅' : '⏳'}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  // Safe formatting function
  const formatCurrency = (amount) => {
    try {
      return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
    } catch (error) {
      return "₹0";
    }
  };

  // Calculate portfolio values safely
  const totalHoldingsValue = portfolio.reduce((sum, holding) => {
    return sum + ((holding.avgPrice || 0) * (holding.quantity || 0));
  }, 0);

  const portfolioData = {
    totalValue: totalHoldingsValue + (funds.currency || 0),
    pnl: 0,
    margin: (funds.currency || 0) * 0.2,
  };

  return (
    <div className="dashboard-bg">
      <div className="dashboard-header">
        <h2>Welcome, {user?.username || "Trader"}! 🚀</h2>
        <p>Glad to have you on our platform.</p>
      </div>
      
      <div className="dashboard-container">
        <div className="dashboard-content">
          {/* Your dashboard content */}
          <div className="dashboard-left">
            <div className="dashboard-card">
              <div className="card-header">
                <h2>Portfolio Summary</h2>
                <p className="card-tagline">View your portfolio performance</p>
              </div>
              <div className="portfolio-summary">
                <div className="summary-item">
                  <span className="summary-label">Total Value</span>
                  <span className="summary-value">
                    {formatCurrency(portfolioData.totalValue)}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">P&L</span>
                  <span className="summary-value">
                    {formatCurrency(portfolioData.pnl)}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Margin Available</span>
                  <span className="summary-value">
                    {formatCurrency(portfolioData.margin)}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Cash Balance</span>
                  <span className="summary-value">
                    {formatCurrency(funds.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card quick-actions">
              <div className="card-header">
                <h2>Quick Actions</h2>
              </div>
              <div className="actions-container">
                <button className="action-btn buy" onClick={() => window.location.reload()}>Buy</button>
                <button className="action-btn sell" onClick={() => window.location.reload()}>Sell</button>
                <button
                  className="action-btn funds"
                  onClick={() => navigate("/funds")}
                >
                  Add Funds
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;