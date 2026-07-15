import React, { useState } from "react";
import "./TradeWindow.css";
import api from "../api/client";

const SellStockWindow = ({ stock, onClose, onSell, portfolio = [] }) => {

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
        "/api/orders/sell",
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
    <div className="trade-modal-overlay" role="presentation" onMouseDown={onClose}>
      <div className="trade-modal trade-modal--sell" role="dialog" aria-modal="true" aria-labelledby="sell-stock-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="trade-modal__header">
          <h3 id="sell-stock-title">Sell {stock.symbol}</h3>
          <button className="trade-modal__close" onClick={onClose} aria-label="Close sell dialog">
            ×
          </button>
        </div>

        <div className="trade-modal__body">
          <div className="trade-modal__price-row">
            <span>Price</span>
            <span>₹{stockPrice.toFixed(2)}</span>
          </div>

          <div className="trade-modal__quantity">
            <div className="trade-modal__quantity-header">
              <span>Quantity</span>
              <span>(Owned: {maxQuantity})</span>
            </div>

            <div className="trade-modal__quantity-controls">
              <button
                className="trade-modal__qty-button"
                aria-label="Decrease quantity"
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
                className="trade-modal__qty-input"
                aria-label="Quantity"
              />
              <button
                className="trade-modal__qty-button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
                disabled={quantity >= maxQuantity}
              >
                +
              </button>
            </div>
          </div>

          {error && <div className="trade-modal__error" role="alert">{error}</div>}

          <div className="trade-modal__summary">
            <div className="trade-modal__summary-row">
              <span>Sell Value</span>
              <span>₹{(quantity * stockPrice).toFixed(2)}</span>
            </div>
          </div>

          <button className="trade-modal__submit trade-modal__submit--sell" onClick={handleSell} disabled={loading}>
            {loading ? "Processing..." : "Sell"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellStockWindow;
