import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../config/api';

function Dashboard() {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState({
    totalValue: 0,
    pnl: 0,
    margin: 0,
  });
  const [funds, setFunds] = useState({ currency: 0, equity: 0, commodity: 0 });
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "Trader" }); // Default name

  // Mock indices data (you can replace this with real API later)
  const indices = [
    { name: "NIFTY 50", value: "22,000", change: "+0.45%" },
    { name: "SENSEX", value: "73,000", change: "+0.38%" },
  ];

  // Format currency
  const formatCurrency = (amount) =>
    `₹${amount?.toLocaleString("en-IN") || "0"}`;
  const formatChange = (value) => (value >= 0 ? `+${value}%` : `${value}%`);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Get current user
        const userRes = await axios.get(`${API_BASE_URL}/api/auth/home`, {
  withCredentials: true,
});
        if (userRes.data.success) setUser(userRes.data.user);

        // Fetch funds
        const fundsResponse = await axios.get(`${API_BASE_URL}/api/funds`, {
  withCredentials: true,
});
        setFunds(fundsResponse.data);

        // Fetch holdings
        const holdingsResponse = await axios.get(
          `${API_BASE_URL}/api/holdings`,
          {
            withCredentials: true,
          }
        );
        setHoldings(holdingsResponse.data);

        // Fetch positions
        const positionsResponse = await axios.get(
          `${API_BASE_URL}/api/positions`,
          {
            withCredentials: true,
          }
        );
        setPositions(positionsResponse.data);

        // Fetch recent orders
        const ordersResponse = await axios.get(
          `${API_BASE_URL}/api/orders`,
          {
            withCredentials: true,
          }
        );
        setOrders(ordersResponse.data.slice(0, 5));

        // Calculate portfolio totals
        const totalHoldingsValue = holdingsResponse.data.reduce(
          (sum, holding) => sum + holding.avgPrice * holding.quantity,
          0
        );

        const totalPnl = positionsResponse.data.reduce(
          (sum, position) => sum + (position.pnl || 0),
          0
        );

        setPortfolio({
          totalValue: totalHoldingsValue + fundsResponse.data.currency,
          pnl: totalPnl,
          margin: fundsResponse.data.currency * 0.2,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
        // Fallback mock data
        setPortfolio({ totalValue: 500000, pnl: 12500, margin: 100000 });
        setOrders([
          { type: "BUY", symbol: "TCS", quantity: 10, status: "COMPLETED" },
          { type: "SELL", symbol: "RELIANCE", quantity: 5, status: "PENDING" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Generate watchlist from holdings
  const watchlist = holdings.slice(0, 3).map((holding) => ({
    symbol: holding.symbol,
    price: formatCurrency(holding.avgPrice),
    change: "+0.0%", // You can add real-time price changes later
  }));

  // Prepare recent orders for display
  const recentOrders = orders.map((order) => ({
    type: order.type,
    symbol: order.symbol,
    qty: order.quantity,
    status: order.status,
  }));

  if (loading) {
    return (
      <div className="dashboard-bg">
        <div className="dashboard-container">
          <div className="dashboard-loading">
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-bg">
      <div className="dashboard-header">
        <h2>Welcome, {user.username}! 🚀</h2>
        <p>Glad to have you on our platform.</p>
      </div>
      <div className="dashboard-container">
        {/* Header with market indices */}
        {/* Header with welcome message */}

        {/* Main content area */}
        <div className="dashboard-content">
          {/* Left column - Portfolio summary */}
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
                    {formatCurrency(portfolio.totalValue)}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">P&L</span>
                  <span
                    className={`summary-value ${
                      portfolio.pnl >= 0 ? "positive" : "negative"
                    }`}
                  >
                    {formatCurrency(portfolio.pnl)}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Margin Available</span>
                  <span className="summary-value">
                    {formatCurrency(portfolio.margin)}
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
                <button className="action-btn buy">Buy</button>
                <button className="action-btn sell">Sell</button>
                <button
                  className="action-btn funds"
                  onClick={() => navigate("/funds")}
                >
                  Add Funds
                </button>
              </div>
            </div>
          </div>

          {/* Right column - Market data */}
          <div className="dashboard-right">
            {/* Watchlist */}
            <div className="dashboard-card">
              <div className="card-header">
                <h2>Watchlist</h2>
                <p className="card-tagline">Track your favorite stocks</p>
              </div>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th align="left">Symbol</th>
                    <th align="left">Price</th>
                    <th align="left">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map((item, i) => (
                    <tr key={i}>
                      <td>{item.symbol}</td>
                      <td>{item.price}</td>
                      <td
                        className={
                          item.change.startsWith("+") ? "positive" : "negative"
                        }
                      >
                        {item.change}
                      </td>
                    </tr>
                  ))}
                  {watchlist.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          color: "#666",
                        }}
                      >
                        No stocks in watchlist. Add some holdings to see them
                        here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Recent Orders
            <div className="recent-order-card">
              <div className="dashboard-card">
                <div className="card-header">
                  <h2>Recent Orders</h2>
                  <p className="card-tagline">View your recent activity</p>
                </div>
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th align="left">Type</th>
                      <th align="left">Symbol</th>
                      <th align="left">Qty</th>
                      <th align="left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, i) => (
                      <tr key={i}>
                        <td>
                          <span
                            className={`order-type ${order.type.toLowerCase()}`}
                          >
                            {order.type}
                          </span>
                        </td>
                        <td>{order.symbol}</td>
                        <td>{order.qty}</td>
                        <td>
                          <span
                            className={`order-status ${order.status.toLowerCase()}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {recentOrders.length === 0 && (
                      <tr>
                        <td
                          colSpan="4"
                          style={{
                            textAlign: "center",
                            padding: "20px",
                            color: "#666",
                          }}
                        >
                          No recent orders. Start trading to see your activity
                          here.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div> */}


          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;