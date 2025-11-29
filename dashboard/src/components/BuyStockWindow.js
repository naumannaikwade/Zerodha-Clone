import React, { useState } from "react";
import axios from "axios";
import "./BuyStockWindow.css";
import API_BASE_URL from "../config/api";
import { useAuth } from "../context/AuthContext";

const BuyStockWindow = ({ stock, onClose, onBuy, funds }) => {

  const { api } = useAuth();
  
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const stockPrice = Number(stock.price ?? stock.ltp ?? 0);
  const maxQuantity = Math.min(
    Math.floor((funds.currency || 0) / stockPrice) || 0,
    10000
  );

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, Math.min(maxQuantity, value)));
  };

  const incrementQuantity = () => {
    if (quantity < maxQuantity) setQuantity((prev) => prev + 1);
    else setError("Max purchase limit reached");
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
    setError("");
  };

  const handleBuy = async () => {
    if (quantity * stockPrice > (funds.currency || 0)) {
      setError("Insufficient funds");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Buying stock:", { symbol: stock.symbol, quantity, price: stockPrice });
      
      const res = await api.post(
        `${API_BASE_URL}/api/orders/buy`,
        {
          symbol: stock.symbol,
          name: stock.name,
          price: stockPrice,
          quantity,
        }
      );

      console.log("Buy response:", res.data);

      if (res.data.success) {
        onBuy(stock, quantity, res.data.order);
        alert(`✅ Bought ${quantity} shares of ${stock.symbol}`);
        onClose();
      } else {
        setError(res.data.message || "Failed to buy stock");
      }
    } catch (err) {
      console.error("Buy error:", err.response?.data || err);
      setError(err.response?.data?.message || "Failed to buy stock. Please try again.");
    } finally {
      setLoading(false);
    }
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
            <span>₹{stockPrice.toFixed(2)}</span>
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
              <span>₹{(quantity * stockPrice).toFixed(2)}</span>
            </div>
            <div className="summary-row small">
              <span>Account Balance</span>
              <span>₹{(funds.currency || 0).toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            className="buy-btn"
            onClick={handleBuy}
            disabled={loading || quantity * stockPrice > (funds.currency || 0)}
          >
            {loading ? "Processing..." : "Buy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyStockWindow;