import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import './Holdings.css';

function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { api } = useAuth(); // ✅ Use AuthContext API

  const format = n => `₹${n?.toLocaleString('en-IN') || '0'}`;
  const formatPnl = n => (n >= 0 ? `+${format(n)}` : `-${format(Math.abs(n))}`);
  const formatPercent = n => {
    const num = typeof n === 'string' ? parseFloat(n) : n;
    return num >= 0 ? `+${num?.toFixed(2) || '0.00'}%` : `${num?.toFixed(2) || '0.00'}%`;
  };

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/holdings'); // ✅ Use api instead of axios
        if (response.data && Array.isArray(response.data)) {
          setHoldings(response.data);
        } else setHoldings([]);
      } catch (err) {
        setError('Failed to load holdings. Using mock data.');
        setHoldings([
          { _id: 1, symbol: 'TCS', name: 'Tata Consultancy Services', quantity: 15, avgPrice: 3200, ltp: 3500, pnl: 4500, pnlPercent: 9.38, investment: 48000, currentValue: 52500 },
          { _id: 2, symbol: 'RELIANCE', name: 'Reliance Industries', quantity: 8, avgPrice: 2600, ltp: 2800, pnl: 1600, pnlPercent: 7.69, investment: 20800, currentValue: 22400 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchHoldings();
  }, [api]); // ✅ Add api to dependencies

  const totalQty = holdings.reduce((sum, h) => sum + (h.quantity || 0), 0);
  const totalInvestment = holdings.reduce((sum, h) => sum + (h.investment || 0), 0);
  const totalCurrentValue = holdings.reduce((sum, h) => sum + (h.currentValue || 0), 0);
  const totalPnl = holdings.reduce((sum, h) => sum + (h.pnl || 0), 0);
  const totalPnlPercent =
    totalInvestment > 0 ? ((totalCurrentValue - totalInvestment) / totalInvestment * 100).toFixed(2) : 0;

  if (loading)
    return (
      <div className="holdings-bg">
        <div className="holdings-container">
          <div className="holdings-card"><p>Loading holdings...</p></div>
        </div>
      </div>
    );

  return (
    <div className="holdings-bg">
      <div className="holdings-container">
        <div className="holdings-card">
          <div className="holdings-header">
            <div className='upper-div'>
              <h2>Holdings</h2>
              <p className="holdings-tagline">View your current portfolio holdings and P&L</p>
              <div className="holdings-summary-info">
                <span>Total Investment: {format(totalInvestment)}</span>
                <span>Current Value: {format(totalCurrentValue)}</span>
                <span>Total P&L: {formatPnl(totalPnl)} ({totalPnlPercent}%)</span>
              </div>
            </div>
          </div>

          {error && <div className="holdings-error">{error}</div>}

          {holdings.length === 0 ? (
            <p>No holdings found. Start investing to build your portfolio.</p>
          ) : (
            <div className="holdings-table-wrapper">
              <table className="holdings-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Avg. Price</th>
                    <th>LTP</th>
                    <th>P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map(h => {
                    const quantity = h.quantity;
                    const investment = h.investment || (h.avgPrice * quantity);
                    const currentValue = h.currentValue || (h.ltp * quantity);
                    const pnl = h.pnl || (currentValue - investment);
                    const pnlPercent = h.pnlPercent || (investment > 0 ? (pnl / investment * 100) : 0);

                    return (
                      <tr key={h._id}>
                        <td>{h.symbol}</td>
                        <td className="holdings-name">{h.name}</td>
                        <td>{quantity}</td>
                        <td>{format(h.avgPrice)}</td>
                        <td>{format(h.ltp)}</td>
                        <td>
                          <div className="holdings-pnl-container">
                            <span className={`holdings-pnl-amount ${pnl >= 0 ? 'positive' : 'negative'}`}>
                              {formatPnl(pnl)}
                            </span>
                            <span className={`holdings-pnl-percent ${pnlPercent >= 0 ? 'positive' : 'negative'}`}>
                              {formatPercent(pnlPercent)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                <tfoot>
                  <tr className="holdings-summary-row">
                    <td>Total</td>
                    <td></td>
                    <td>{totalQty}</td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="holdings-pnl-container">
                        <span className={`holdings-pnl-amount ${totalPnl >= 0 ? 'positive' : 'negative'}`}>
                          {formatPnl(totalPnl)}
                        </span>
                        <span className={`holdings-pnl-percent ${totalPnlPercent >= 0 ? 'positive' : 'negative'}`}>
                          {formatPercent(totalPnlPercent)}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Holdings;