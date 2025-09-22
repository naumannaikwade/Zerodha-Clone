import React, { useState, useEffect } from "react";
import "./Watchlist.css";
import axios from "axios";
import { fetchQuote } from "../api/finnhub"; // Import from your API file

// Buy Stock Window Component
const BuyStockWindow = ({ stock, onClose, onBuy, funds }) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const maxQuantity = Math.min(Math.floor(funds.currency / stock.price), 10000);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, Math.min(maxQuantity, value)));
  };

  const incrementQuantity = () => {
    if (quantity < maxQuantity) setQuantity((prev) => prev + 1);
    else setError(`Max purchase limit reached`);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
    setError("");
  };

  const handleBuy = async () => {
    if (quantity * stock.price > funds.currency) {
      setError("Insufficient funds");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Sending buy request:", {
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        quantity,
      });

      // Use environment variable for API URL
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      
      const res = await axios.post(
        `${API_URL}/api/orders/buy`,
        {
          symbol: stock.symbol,
          name: stock.name,
          price: stock.price,
          quantity,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Buy response:", res.data);

      if (res.data.success) {
        onBuy(stock, quantity, res.data.order);
        alert(`Successfully bought ${quantity} shares of ${stock.symbol}`);
        onClose();
      } else {
        setError(res.data.message || "Failed to buy stock");
      }
    } catch (err) {
      console.error("Buy error details:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to buy stock";
      setError(errorMessage);
    }

    setLoading(false);
  };

  return (
    <div className="buy-modal-overlay">
      <div className="buy-modal">
        <div className="buy-modal-header">
          <h3>Buy {stock.symbol}</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
          <p className="stock-name">{stock.name}</p>
        </div>

        <div className="buy-modal-body">
          <div className="price-row">
            <span>LTP</span>
            <span>₹{stock.price.toFixed(2)}</span>
          </div>

          <div className="quantity-section">
            <div className="quantity-header">
              <label>Quantity</label>
              <span className="available-qty">Available: {maxQuantity}</span>
            </div>
            <div className="quantity-controls">
              <button className="qty-btn" onClick={decrementQuantity}>
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={maxQuantity}
                className="qty-input"
              />
              <button className="qty-btn" onClick={incrementQuantity}>
                +
              </button>
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>

          <div className="amount-summary">
            <div className="summary-row">
              <span>Estimated amount</span>
              <span>₹{(quantity * stock.price).toFixed(2)}</span>
            </div>
            <div className="summary-row small">
              <span>Account Balance</span>
              <span>₹{funds.currency.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            className="buy-btn"
            onClick={handleBuy}
            disabled={loading || quantity * stock.price > funds.currency}
          >
            {loading ? "Processing..." : "Buy"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Stock symbols to track
const stockSymbols = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META", "NFLX", "DIS",
  "BABA", "V", "MA", "JPM", "JNJ", "WMT", "PG", "HD", "BAC", "ABBV", "PFE",
  "KO", "PEP", "COST", "AVGO", "CRM", "TMO", "ACN", "CVX", "NKE", "MRK",
  "ABT", "ADBE", "TXN", "LLY", "NEE", "DHR", "QCOM", "BMY", "PM", "T",
  "UNP", "LOW", "HON", "UPS", "RTX", "BLK", "AMAT", "SYK", "LMT", "MDT"
];

// Company names mapping
const companyNames = {
  AAPL: "Apple Inc.",
  MSFT: "Microsoft Corporation",
  GOOGL: "Alphabet Inc.",
  AMZN: "Amazon.com Inc.",
  TSLA: "Tesla Inc.",
  NVDA: "NVIDIA Corporation",
  META: "Meta Platforms Inc.",
  NFLX: "Netflix Inc.",
  DIS: "Walt Disney Company",
  BABA: "Alibaba Group",
  V: "Visa Inc.",
  MA: "Mastercard Inc.",
  JPM: "JPMorgan Chase",
  JNJ: "Johnson & Johnson",
  WMT: "Walmart Inc.",
  PG: "Procter & Gamble",
  HD: "Home Depot Inc.",
  BAC: "Bank of America",
  ABBV: "AbbVie Inc.",
  PFE: "Pfizer Inc.",
  KO: "Coca-Cola Company",
  PEP: "PepsiCo Inc.",
  COST: "Costco Wholesale",
  AVGO: "Broadcom Inc.",
  CRM: "Salesforce Inc.",
  TMO: "Thermo Fisher Scientific",
  ACN: "Accenture PLC",
  CVX: "Chevron Corporation",
  NKE: "Nike Inc.",
  MRK: "Merck & Co.",
  ABT: "Abbott Laboratories",
  ADBE: "Adobe Inc.",
  TXN: "Texas Instruments",
  LLY: "Eli Lilly",
  NEE: "NextEra Energy",
  DHR: "Danaher Corporation",
  QCOM: "QUALCOMM Inc.",
  BMY: "Bristol Myers Squibb",
  PM: "Philip Morris",
  T: "AT&T Inc.",
  UNP: "Union Pacific",
  LOW: "Lowes Companies",
  HON: "Honeywell",
  UPS: "United Parcel Service",
  RTX: "Raytheon Technologies",
  BLK: "BlackRock Inc.",
  AMAT: "Applied Materials",
  SYK: "Stryker Corporation",
  LMT: "Lockheed Martin",
  MDT: "Medtronic PLC",
};

const Watchlist = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hoveredStockSymbol, setHoveredStockSymbol] = useState(null);
  const [buyingStock, setBuyingStock] = useState(null);
  const [orders, setOrders] = useState([]);
  const [funds, setFunds] = useState({ currency: 100000 });
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshCountdown, setRefreshCountdown] = useState(300);

  const itemsPerPage = 9;

  // Fetch user funds from backend
  const fetchFunds = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await axios.get(`${API_URL}/api/funds`, {
        withCredentials: true,
      });
      setFunds(res.data);
    } catch (err) {
      console.error("Failed to fetch funds:", err);
    }
  };

  // Fetch live stock data
  const fetchAllStocks = async () => {
    setLoading(true);
    setRefreshCountdown(30);
    try {
      const promises = stockSymbols.map((symbol) => fetchQuote(symbol));
      const results = await Promise.all(promises);

      const validStocks = results
        .filter((stock) => stock !== null)
        .map((stock) => ({
          ...stock,
          name: companyNames[stock.symbol] || stock.symbol,
          volume: `${(Math.random() * 5 + 0.5).toFixed(1)}M`,
        }));

      setStockData(validStocks);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
    setLoading(false);
  };

  // Initial load and periodic updates
  useEffect(() => {
    fetchFunds();
    fetchAllStocks();

    const fetchInterval = setInterval(fetchAllStocks, 300000);
    const countdownInterval = setInterval(() => {
      setRefreshCountdown((prev) => (prev <= 1 ? 300 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const filtered = stockData.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
      stock.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleBuyStock = (stock, quantity, order) => {
    setOrders((prev) => [...prev, order]);
    setFunds((prev) => ({
      ...prev,
      currency: prev.currency - stock.price * quantity,
    }));
    alert(`Successfully bought ${quantity} shares of ${stock.symbol}`);
  };

  return (
    <div className="watchlist-container">
      <div className="account-balance">
        Available Balance: ₹{funds.currency.toLocaleString("en-IN")}
      </div>

      {buyingStock && (
        <BuyStockWindow
          stock={buyingStock}
          onClose={() => setBuyingStock(null)}
          onBuy={handleBuyStock}
          funds={funds}
        />
      )}

      <div className="header">
        <h2>Live Stock Watchlist</h2>
        <div className="market-indices">
          <div className="refresh-info">
            {lastUpdated && (
              <span className="last-updated">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <span className="refresh-countdown">
              Next refresh: {Math.floor(refreshCountdown / 60)}m{" "}
              {refreshCountdown % 60}s
            </span>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search stocks by symbol or company name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="search-input"
        />
      </div>

      <div className="main-content">
        <div className="table-header">
          <div>Instrument</div>
          <div>LTP</div>
          <div>Change</div>
          <div>Volume</div>
        </div>

        <div className="stock-list">
          {loading ? (
            <div className="loading-message">Loading live stock data...</div>
          ) : paginated.length === 0 ? (
            <div className="no-results">
              No stocks found matching your search.
            </div>
          ) : (
            paginated.map((stock, index) => (
              <div
                key={stock.symbol}
                className="stock-row"
                onMouseEnter={() => setHoveredStockSymbol(stock.symbol)}
                onMouseLeave={() => setHoveredStockSymbol(null)}
              >
                <div className="stock-info">
                  <span className="stock-symbol">{stock.symbol}</span>
                  <span className="stock-name">{stock.name}</span>
                </div>

                <div className="stock-price">₹{stock.price.toFixed(2)}</div>

                <div className="stock-change">
                  <span className={stock.change < 0 ? "negative" : "positive"}>
                    {stock.change > 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </span>
                  <span
                    className={`change-amount ${
                      stock.change < 0 ? "negative" : "positive"
                    }`}
                  >
                    {stock.change > 0 ? "+" : ""}
                    {stock.change.toFixed(2)}
                  </span>
                </div>

                <div className="stock-volume">
                  {hoveredStockSymbol === stock.symbol ? (
                    <button
                      className="buy-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBuyingStock(stock);
                      }}
                    >
                      Buy
                    </button>
                  ) : (
                    <div>{stock.volume}</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && !loading && (
          <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`page-btn ${page === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;