import React, { useEffect, useState } from "react";
import { useFunds } from "../context/FundsContext";
import "./Funds.css";

function Funds() {
  const {
    funds,
    transactions,
    loading,
    error,
    fetchFunds,
    addDemoFunds,
    clearError,
    getTotalBalance,
    getTotalMarginUsed,
    getTotalAvailable,
  } = useFunds();

  const [showAddFunds, setShowAddFunds] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchFunds();
  }, [fetchFunds]);

  const handleAddFunds = async () => {
    const result = await addDemoFunds();
    if (result.success) {
      setSuccessMessage(result.message);
      setShowAddFunds(false);
      setTimeout(() => setSuccessMessage(""), 5000);
    } else {
      setSuccessMessage(result.error);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const format = (n) => `₹${(n || 0).toLocaleString("en-IN")}`;
  const totalBalance = getTotalBalance();
  const totalMargin = getTotalMarginUsed();
  const totalAvailable = getTotalAvailable();
  const maxFunds = 100000;
  const remainingFunds = Math.max(0, maxFunds - totalBalance);

  const fundsData = [
    {
      id: 1,
      type: "Equity",
      balance: funds?.equity || 0,
      marginUsed: Math.floor((funds?.equity || 0) * 0.2),
      available: (funds?.equity || 0) - Math.floor((funds?.equity || 0) * 0.2),
    },
    {
      id: 2,
      type: "Commodity",
      balance: funds?.commodity || 0,
      marginUsed: Math.floor((funds?.commodity || 0) * 0.2),
      available: (funds?.commodity || 0) - Math.floor((funds?.commodity || 0) * 0.2),
    },
    {
      id: 3,
      type: "Currency",
      balance: funds?.currency || 0,
      marginUsed: Math.floor((funds?.currency || 0) * 0.2),
      available: (funds?.currency || 0) - Math.floor((funds?.currency || 0) * 0.2),
    },
  ];

  return (
    <div className="funds-bg">
      <div className="funds-container">
        <div className="funds-card">
          <div className="funds-header">
            <div className='upper-div'>
              <h2>Funds</h2>
              <p className="funds-tagline">View your available balance and margin across all segments</p>
              <div className="fund-limit-info">
                <span>Fund Limit: {format(maxFunds)}</span>
                <span>Used: {format(totalBalance)}</span>
                {remainingFunds > 0 && <span>Remaining: {format(remainingFunds)}</span>}
              </div>
            </div>
            <div className="funds-actions">
              <button
                onClick={() => setShowAddFunds(true)}
                className="add-funds-btn"
                disabled={loading || totalBalance >= maxFunds}
              >
                {loading ? "Adding..." : "Add Demo Funds"}
              </button>
            </div>
          </div>

          {error && (
            <div className="funds-error">
              {error}
              <button onClick={clearError} className="clear-error-btn">×</button>
            </div>
          )}

          {successMessage && <div className="funds-success">{successMessage}</div>}

          <div className="funds-table-wrapper">
            <table className="funds-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Balance</th>
                  <th>Margin Used</th>
                  <th>Available</th>
                </tr>
              </thead>
              <tbody>
                {fundsData.map((f) => (
                  <tr key={f.id}>
                    <td>{f.type}</td>
                    <td>{format(f.balance)}</td>
                    <td>{format(f.marginUsed)}</td>
                    <td><span className="funds-available-pill">{format(f.available)}</span></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="funds-summary-row">
                  <td style={{ fontWeight: 700 }}>Total</td>
                  <td style={{ fontWeight: 700 }}>{format(totalBalance)}</td>
                  <td style={{ fontWeight: 700 }}>{format(totalMargin)}</td>
                  <td><span className="funds-available-pill total">{format(totalAvailable)}</span></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {transactions?.length > 0 && (
            <div className="transactions-section">
              <h3>Recent Transactions</h3>
              <div className="transactions-list">
                {transactions.slice(-5).reverse().map((txn, idx) => (
                  <div key={idx} className="transaction-item">
                    <div className="transaction-info">
                      <span className="transaction-type">{txn.type}</span>
                      <span className="transaction-segment">{txn.segment}</span>
                    </div>
                    <div className="transaction-details">
                      <span className="transaction-amount">{format(txn.amount)}</span>
                      <span className="transaction-description">{txn.description}</span>
                      <span className="transaction-date">
                        {new Date(txn.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showAddFunds && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Demo Funds</h3>
              <button onClick={() => setShowAddFunds(false)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <p>Add remaining funds to reach ₹100,000 in your account?</p>
              <p className="modal-info">Current Balance: {format(totalBalance)} / {format(maxFunds)}</p>
              {remainingFunds > 0 && <p className="modal-info">Amount to add: {format(remainingFunds)}</p>}
              <div className="modal-actions">
                <button onClick={handleAddFunds} className="modal-confirm" disabled={loading}>
                  {loading ? "Adding..." : "Add Funds"}
                </button>
                <button onClick={() => setShowAddFunds(false)} className="modal-cancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Funds;