import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Watchlist.css";
import BuyStockWindow from "./BuyStockWindow";
import SellStockWindow from "./SellStockWindow";

const fetchStocksFromBackend = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/stocks");
    return res.data;
  } catch (err) {
    console.error("Error fetching stocks:", err);
    return [];
  }
};

const Watchlist = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hoveredStockSymbol, setHoveredStockSymbol] = useState(null);
  const [buyingStock, setBuyingStock] = useState(null);
  const [sellingStock, setSellingStock] = useState(null);
  const [orders, setOrders] = useState([]);
  const [funds, setFunds] = useState({ currency: 100000 });
  const [stockData, setStockData] = useState([]);
  const [portfolio, setPortfolio] = useState([]); // ✅ user’s holdings
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshCountdown, setRefreshCountdown] = useState(300);

  const itemsPerPage = 9;

  // ✅ Fetch user funds
  const fetchFunds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/funds", {
        withCredentials: true,
      });
      setFunds(res.data);
    } catch (err) {
      console.error("Failed to fetch funds:", err);
    }
  };

  // ✅ Fetch holdings (real portfolio)
  const fetchPortfolio = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/holdings", {
        withCredentials: true,
      });
      setPortfolio(res.data || []);
    } catch (err) {
      console.error("Failed to fetch holdings:", err);
    }
  };

  // ✅ Fetch stocks
  const fetchAllStocks = async () => {
    setLoading(true);
    setRefreshCountdown(300);
    const stocks = await fetchStocksFromBackend();
    setStockData(stocks);
    setLastUpdated(new Date());
    setLoading(false);
  };

  // ✅ On mount
  useEffect(() => {
    fetchFunds();
    fetchAllStocks();
    fetchPortfolio();

    const fetchInterval = setInterval(fetchAllStocks, 300000);
    const countdownInterval = setInterval(() => {
      setRefreshCountdown((prev) => (prev <= 1 ? 300 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  // ✅ Handle Buy
  const handleBuyStock = async (stock, quantity, order) => {
    setOrders((prev) => [...prev, order]);
    setFunds((prev) => ({
      ...prev,
      currency: prev.currency - (stock.price || stock.ltp || 0) * quantity,
    }));

    await fetchPortfolio(); // 🔁 Sync with backend
  };

  // ✅ Handle Sell
  const handleSellStock = async (stock, quantity, order) => {
    setOrders((prev) => [...prev, order]);
    setFunds((prev) => ({
      ...prev,
      currency: prev.currency + (stock.price || stock.ltp || 0) * quantity,
    }));

    await fetchPortfolio(); // 🔁 Sync with backend
  };

  // ✅ Search and Pagination
  const filtered = stockData.filter(
    (stock) =>
      stock.symbol?.toLowerCase().includes(search.toLowerCase()) ||
      stock.name?.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="watchlist-container">
      {/* Buy Modal */}
      {buyingStock && (
        <BuyStockWindow
          stock={buyingStock}
          onClose={() => setBuyingStock(null)}
          onBuy={handleBuyStock}
          funds={funds}
        />
      )}

      {/* Sell Modal */}
      {sellingStock && (
        <SellStockWindow
          stock={sellingStock}
          onClose={() => setSellingStock(null)}
          onSell={handleSellStock}
          portfolio={portfolio}
        />
      )}

      {/* Header */}
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
              Next refresh: {Math.floor(refreshCountdown / 60)}m {refreshCountdown % 60}s
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="search-input"
        />
      </div>

      {/* Stock List */}
      <div className="main-content">
        <div className="table-header">
          <div>Instrument</div>
          <div>LTP</div>
          <div>Change</div>
          <div style={{ textAlign: "right" }}>Buy / Sell</div>
        </div>

        <div className="stock-list">
          {loading ? (
            <div className="loading-message">Loading data...</div>
          ) : paginated.length === 0 ? (
            <div className="no-results">No matching stocks found.</div>
          ) : (
            paginated.map((stock) => (
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

                <div className="stock-price">
                  ₹{Number(stock.price ?? stock.ltp ?? 0).toFixed(2)}
                </div>

                <div className="stock-change">
                  <span className={stock.change < 0 ? "negative" : "positive"}>
                    {stock.change > 0 ? "+" : ""}
                    {(stock.changePercent ?? 0).toFixed(2)}%
                  </span>
                  <span
                    className={`change-amount ${
                      stock.change < 0 ? "negative" : "positive"
                    }`}
                  >
                    {stock.change > 0 ? "+" : ""}
                    {(stock.change ?? 0).toFixed(2)}
                  </span>
                </div>

                {/* Buy/Sell Buttons */}
                <div className="stock-volume">
                  {hoveredStockSymbol === stock.symbol ? (
                    <div className="action-buttons">
                      <button
                        className="buy-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBuyingStock(stock);
                        }}
                      >
                        B
                      </button>
                      <button
                        className="sell-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSellingStock(stock);
                        }}
                      >
                        S
                      </button>
                    </div>
                  ) : (
                    <div>{stock.volume ?? "--"}</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
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
