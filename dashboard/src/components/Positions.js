import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import './Positions.css';

function Positions() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { api } = useAuth(); // ✅ Use AuthContext API

  // Format currency
  const format = n => `₹${n?.toLocaleString('en-IN') || '0'}`;
  
  // Format P&L with + or -
  const formatPnl = n => (n >= 0 ? `+${format(n)}` : `-${format(Math.abs(n))}`);
  
  // Format percentage
  const formatPercent = n => {
    const num = typeof n === 'string' ? parseFloat(n) : n;
    return num >= 0 ? `+${num?.toFixed(2) || '0.00'}%` : `${num?.toFixed(2) || '0.00'}%`;
  };

  // Fetch positions from backend
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        console.log("Fetching positions from API...");
        
        const response = await api.get('/api/positions'); // ✅ Use api instead of axios
        
        console.log("API response:", response.data);
        
        if (response.data && Array.isArray(response.data)) {
          setPositions(response.data);
        } else {
          setPositions([]);
          setError('No positions data received from server');
        }
      } catch (err) {
        console.error('Error fetching positions:', err);
        setError('Failed to load positions. Please try again.');
        // Fallback to mock data if API fails
        setPositions([
          { 
            _id: 1, 
            symbol: 'TCS', 
            name: 'Tata Consultancy Services',
            quantity: 5, 
            buyPrice: 3400, 
            currentPrice: 3500, 
            pnl: 500,
            type: 'Long',
            segment: 'Equity'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, [api]); // ✅ Add api to dependencies

  // Calculate totals
  const totalQty = positions.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const totalInvestment = positions.reduce((sum, p) => sum + ((p.buyPrice || 0) * (p.quantity || 0)), 0);
  const totalCurrentValue = positions.reduce((sum, p) => sum + ((p.currentPrice || 0) * (p.quantity || 0)), 0);
  const totalPnl = positions.reduce((sum, p) => sum + (p.pnl || ((p.currentPrice - p.buyPrice) * p.quantity) || 0), 0);
  const totalPnlPercent = totalInvestment > 0 ? (totalPnl / totalInvestment * 100) : 0;

  if (loading) {
    return (
      <div className="positions-bg">
        <div className="positions-container">
          <div className="positions-card">
            <div className="positions-loading">
              <p>Loading positions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="positions-bg">
      <div className="positions-container">
        <div className="positions-card">
          <div className="positions-header">
            <div className='upper-div'>
              <h2>Positions</h2>
              <p className="positions-tagline">Track your open positions and mark-to-market P&L</p>
              <div className="positions-summary-info">
                <span>Total Positions: {positions.length}</span>
                <span>Total Quantity: {totalQty}</span>
                <span>Total P&L: {formatPnl(totalPnl)} ({totalPnlPercent.toFixed(2)}%)</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="positions-error">
              {error}
            </div>
          )}

          {positions.length === 0 ? (
            <div className="positions-empty">
              <p>No open positions found. Start trading to see your positions.</p>
            </div>
          ) : (
            <div className="positions-table-wrapper">
              <table className="positions-table">
                <thead>
                  <tr>
                    <th align="left">Symbol</th>
                    <th align="left">Name</th>
                    <th align="left">Type</th>
                    <th align="left">Qty</th>
                    <th align="left">Avg. Price</th>
                    <th align="left">LTP</th>
                    <th align="left">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((p) => {
                    const quantity = p.quantity || 0;
                    const buyPrice = p.buyPrice || 0;
                    const currentPrice = p.currentPrice || 0;
                    const pnlValue = p.pnl || ((currentPrice - buyPrice) * quantity);
                    const pnlPercent = buyPrice > 0 ? ((currentPrice - buyPrice) / buyPrice * 100) : 0;
                    
                    return (
                      <tr key={p._id || p.id}>
                        <td>{p.symbol}</td>
                        <td className="positions-name">{p.name}</td>
                        <td>
                          <span className={`positions-type-pill ${(p.type || 'long').toLowerCase()}`}>
                            {p.type || 'Long'}
                          </span>
                        </td>
                        <td>{quantity}</td>
                        <td>{format(buyPrice)}</td>
                        <td>{format(currentPrice)}</td>
                        <td>
                          <div className="positions-pnl-container">
                            <span className={`positions-pnl-amount ${pnlValue >= 0 ? 'positive' : 'negative'}`}>
                              {formatPnl(pnlValue)}
                            </span>
                            <span className={`positions-pnl-percent ${pnlPercent >= 0 ? 'positive' : 'negative'}`}>
                              {formatPercent(pnlPercent)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="positions-summary-row">
                    <td style={{fontWeight:700}}>Total</td>
                    <td></td>
                    <td></td>
                    <td style={{fontWeight:700}}>{totalQty}</td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="positions-pnl-container">
                        <span className={`positions-pnl-amount ${totalPnl >= 0 ? 'positive' : 'negative'}`}>
                          {formatPnl(totalPnl)}
                        </span>
                        <span className={`positions-pnl-percent ${totalPnlPercent >= 0 ? 'positive' : 'negative'}`}>
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

export default Positions;