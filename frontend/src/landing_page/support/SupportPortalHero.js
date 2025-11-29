import React, { useState } from 'react';
import './SupportPortal.css';

export default function SupportPortalHero() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="support-hero">
      <div className="support-container">
        <div className="support-header">
          <h1>Support Portal</h1>
          <a href="#" className="track-link">Track Tickets</a>
        </div>

        <div className="support-content">
          <div className="search-section">
            <h2>
              Search for an answer or browse help topics<br />to create a ticket
            </h2>
            
            <input
              type="text"
              placeholder="Eg: how do I activate F&O, why is my order getting rejected..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />

            <div className="quick-links">
              <a href="#">Track account opening</a>
              <a href="#">Track segment activation</a>
              <a href="#">Intraday margins</a>
              <a href="#">Kite user manual</a>
            </div>
          </div>

          <div className="featured-section">
            <h3>Featured</h3>
            <ol>
              <li>
                <a href="#">1. Current Takeovers and Delisting - January 2024</a>
              </li>
              <li>
                <a href="#">2. Latest Intraday leverages - MIS & CO</a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}