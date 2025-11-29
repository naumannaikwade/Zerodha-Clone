import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { api } = useAuth();

  // Format currency
  const format = n => `₹${n?.toLocaleString('en-IN') || '0'}`;

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/orders');
        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          setOrders([]);
          setError('No orders data received from server');
        }
      } catch (err) {
        setError('Failed to load orders. Using mock data.');
        setOrders([
          { _id: 1, type: 'BUY', symbol: 'TCS', quantity: 10, price: 3500, total: 35000, status: 'Completed', createdAt: '2023-05-15T10:30:00' },
          { _id: 2, type: 'SELL', symbol: 'RELIANCE', quantity: 5, price: 2800, total: 14000, status: 'Pending', createdAt: '2023-05-16T11:45:00' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [api]);

  // Totals
  const totalQty = orders.reduce((sum, o) => sum + (o.quantity || 0), 0);
  const totalValue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const completedOrders = orders.filter(o => o.status === 'Completed').length;

  if (loading) {
    return (
      <div className="orders-bg">
        <div className="orders-container">
          <div className="orders-card">
            <p>Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-bg">
      <div className="orders-container">
        <div className="orders-card">
          <div className="orders-header">
            <div className='upper-div'>
              <h2>Orders</h2>
              <p className="orders-tagline">View your recent buy and sell orders</p>
              <div className="orders-summary-info">
                <span>Total Orders: {orders.length}</span>
                <span>Completed: {completedOrders}</span>
                <span>Total Value: {format(totalValue)}</span>
              </div>
            </div>
          </div>

          {error && <div className="orders-error">{error}</div>}

          {orders.length === 0 ? (
            <p>No orders found. Start trading to see your order history.</p>
          ) : (
            <>
              {/* Table Wrapper */}
              <div className="orders-table-wrapper">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Symbol</th>
                      <th>Name</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Value</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id}>
                        <td>
                          <span className={`order-type-pill ${order.type.toLowerCase()}`}>
                            {order.type}
                          </span>
                        </td>
                        <td>{order.symbol}</td>
                        <td>{order.name || order.symbol}</td>
                        <td>{order.quantity}</td>
                        <td>{format(order.price)}</td>
                        <td>{format(order.total)}</td>
                        <td>
                          <span className={`order-status-pill ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="orders-summary-row">
                      <td>Total</td>
                      <td></td>
                      <td></td>
                      <td>{totalQty}</td>
                      <td></td>
                      <td>{format(totalValue)}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Transactions */}
              <div className="orders-transactions-section">
                <h3>Recent Order Details</h3>
                <div className="orders-transactions-list">
                  {orders.slice(0, 3).map((order, index) => (
                    <div key={index} className="orders-transaction-item">
                      <div className="orders-transaction-info">
                        <span className="orders-transaction-type">{order.type}</span>
                        <span className="orders-transaction-segment">Equity</span>
                      </div>
                      <div className="orders-transaction-details">
                        <span className="orders-transaction-amount">{format(order.total)}</span>
                        <span className="orders-transaction-description">
                          {order.type} {order.quantity} shares of {order.symbol}
                        </span>
                        <span className="orders-transaction-date">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;