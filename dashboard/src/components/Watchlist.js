import React, { useState, useEffect } from "react";
import { useStocks } from "../context/StockContext";
import { useFunds } from "../context/FundsContext";
import "./Watchlist.css";
import BuyStockWindow from "./BuyStockWindow";
import SellStockWindow from "./SellStockWindow";

const Watchlist = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hoveredStockSymbol, setHoveredStockSymbol] = useState(null);
  const [buyingStock, setBuyingStock] = useState(null);
  const [sellingStock, setSellingStock] = useState(null);
  const [refreshCountdown, setRefreshCountdown] = useState(300);

  const { stocks, portfolio, loading, lastUpdated, refreshStocks, refreshPortfolio } = useStocks();
  const { funds, fetchFunds } = useFunds();

  const itemsPerPage = 9;

  // Handle Buy
  const handleBuyStock = async (stock, quantity, order) => {
    await fetchFunds();
    await refreshPortfolio();
  };

  // Handle Sell
  const handleSellStock = async (stock, quantity, order) => {
    await fetchFunds();
    await refreshPortfolio();
  };

  // Search and Pagination
  const filtered = stocks.filter(
    (stock) =>
      stock.symbol?.toLowerCase().includes(search.toLowerCase()) ||
      stock.name?.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // Countdown timer
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setRefreshCountdown((prev) => (prev <= 1 ? 300 : prev - 1));
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className="watchlist-container">
      {buyingStock && (
        <BuyStockWindow
          stock={buyingStock}
          onClose={() => setBuyingStock(null)}
          onBuy={handleBuyStock}
          funds={funds}
        />
      )}

      {sellingStock && (
        <SellStockWindow
          stock={sellingStock}
          onClose={() => setSellingStock(null)}
          onSell={handleSellStock}
          portfolio={portfolio}
        />
      )}

      <div className="header">
        <h2>Live Stock Watchlist</h2>
        <div className="market-indices">
          <div className="refresh-info">
            {lastUpdated && (
              <span className="last-updated">Updated: {lastUpdated.toLocaleTimeString()}</span>
            )}
            <span className="refresh-countdown">
              Next refresh: {Math.floor(refreshCountdown / 60)}m {refreshCountdown % 60}s
            </span>
          </div>
        </div>
      </div>

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

      <div className="main-content">
        <div className="table-header">
          <div>Instrument</div>
          <div>LTP</div>
          <div>Change</div>
          <div style={{ textAlign: "right" }}>Buy / Sell</div>
        </div>

        <div className="stock-list">
          {loading ? (
            <div className="loading-message">Loading stock data...</div>
          ) : stocks.length === 0 ? (
            <div className="no-results">No stocks available. Please check backend connection.</div>
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

                <div className="stock-price">₹{Number(stock.ltp ?? 0).toFixed(2)}</div>

                <div className="stock-change">
                  <span className={stock.change < 0 ? "negative" : "positive"}>
                    {stock.change > 0 ? "+" : ""}
                    {(stock.changePercent ?? 0).toFixed(2)}%
                  </span>
                  <span className={`change-amount ${stock.change < 0 ? "negative" : "positive"}`}>
                    {stock.change > 0 ? "+" : ""}
                    {(stock.change ?? 0).toFixed(2)}
                  </span>
                </div>

                <div className="stock-volume">
                  {hoveredStockSymbol === stock.symbol ? (
                    <div className="action-buttons">
                      <button className="buy-button" onClick={() => setBuyingStock(stock)}>B</button>
                      <button className="sell-button" onClick={() => setSellingStock(stock)}>S</button>
                    </div>
                  ) : (
                    <div>--</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && !loading && stocks.length > 0 && (
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