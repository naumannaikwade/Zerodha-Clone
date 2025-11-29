import React, { useState } from "react";
import axios from "axios";
import "./SellStockWindow.css";
import API_BASE_URL from '../config/api';
import { useAuth } from "../context/AuthContext";

const SellStockWindow = ({ stock, onClose, onSell, portfolio = [] }) => {

  const { api } = useAuth();
  
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const stockPrice = Number(stock.price ?? stock.ltp ?? 0);

  // ✅ Safely check for owned quantity
  const maxQuantity =
    stock.ownedQuantity ??
    (Array.isArray(portfolio)
      ? portfolio.find((p) => p.symbol === stock.symbol)?.quantity || 0
      : 0);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, Math.min(maxQuantity, value)));
  };

  const handleSell = async () => {
    if (maxQuantity <= 0) {
      setError("You don't own any shares of this stock.");
      return;
    }
    if (quantity > maxQuantity) {
      setError(`You only have ${maxQuantity} shares.`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Selling stock:", { symbol: stock.symbol, quantity, price: stockPrice });
      
      const res = await api.post(
        `${API_BASE_URL}/api/orders/sell`,
        {
          symbol: stock.symbol,
          price: stockPrice,
          quantity,
        }
      );

      console.log("Sell response:", res.data);

      if (res.data.success) {
        onSell(stock, quantity, res.data.order);
        alert(`✅ Sold ${quantity} shares of ${stock.symbol}`);
        onClose();
      } else {
        setError(res.data.message || "Sell failed");
      }
    } catch (err) {
      console.error("Sell error:", err.response?.data || err);
      setError(err.response?.data?.message || "Error while selling. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="buy-modal-overlay">
      <div className="buy-modal">
        <div className="buy-modal-header">
          <h3>Sell {stock.symbol}</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="buy-modal-body">
          <div className="price-row">
            <span>Price</span>
            <span>₹{stockPrice.toFixed(2)}</span>
          </div>

          <div className="quantity-section">
            <div className="quantity-header">
              <span>Quantity</span>
              <span>(Owned: {maxQuantity})</span>
            </div>

            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max={maxQuantity}
                value={quantity}
                onChange={handleQuantityChange}
                className="qty-input"
              />
              <button
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
                disabled={quantity >= maxQuantity}
              >
                +
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="amount-summary">
            <div className="summary-row">
              <span>Sell Value</span>
              <span>₹{(quantity * stockPrice).toFixed(2)}</span>
            </div>
          </div>

          <button className="sell-btn" onClick={handleSell} disabled={loading}>
            {loading ? "Processing..." : "Sell"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellStockWindow;