import React, { useState } from "react";
import "./TradeWindow.css";
import api from "../api/client";

const BuyStockWindow = ({ stock, onClose, onBuy, funds }) => {

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
        "/api/orders/buy",
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
    <div className="trade-modal-overlay" role="presentation" onMouseDown={onClose}>
      <div className="trade-modal trade-modal--buy" role="dialog" aria-modal="true" aria-labelledby="buy-stock-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="trade-modal__header">
          <h3 id="buy-stock-title">Buy {stock.symbol}</h3>
          <button className="trade-modal__close" onClick={onClose} aria-label="Close buy dialog">
            ×
          </button>
          <p className="trade-modal__stock-name">{stock.name}</p>
        </div>

        <div className="trade-modal__body">
          <div className="trade-modal__price-row">
            <span>LTP</span>
            <span>₹{stockPrice.toFixed(2)}</span>
          </div>

          <div className="trade-modal__quantity">
            <div className="trade-modal__quantity-header">
              <label>Quantity</label>
              <span className="available-qty">Available: {maxQuantity}</span>
            </div>

            <div className="trade-modal__quantity-controls">
              <button className="trade-modal__qty-button" onClick={decrementQuantity} aria-label="Decrease quantity">
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={maxQuantity}
                className="trade-modal__qty-input"
                aria-label="Quantity"
              />
              <button className="trade-modal__qty-button" onClick={incrementQuantity} aria-label="Increase quantity">
                +
              </button>
            </div>

            {error && <div className="trade-modal__error" role="alert">{error}</div>}
          </div>

          <div className="trade-modal__summary">
            <div className="trade-modal__summary-row">
              <span>Estimated amount</span>
              <span>₹{(quantity * stockPrice).toFixed(2)}</span>
            </div>
            <div className="trade-modal__summary-row trade-modal__summary-row--small">
              <span>Account Balance</span>
              <span>₹{(funds.currency || 0).toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            className="trade-modal__submit trade-modal__submit--buy"
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
