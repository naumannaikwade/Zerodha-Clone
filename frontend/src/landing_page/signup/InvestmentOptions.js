import React from "react";
import "./InvestmentOptions.css";

function InvestmentOptions() {
  return (
    <div className="investment-options">
      <div className="investment-container">
        <h2 className="investment-title">Investment options with Zerodha demat account</h2>

        <div className="options-grid">
          {/* Stocks & IPO */}
          <div className="option-card">
            <svg className="option-icon" viewBox="0 0 100 100" fill="none">
              <rect x="10" y="60" width="15" height="30" fill="#387ed1"/>
              <rect x="30" y="45" width="15" height="45" fill="#387ed1"/>
              <rect x="50" y="30" width="15" height="60" fill="#387ed1"/>
              <rect x="70" y="40" width="15" height="50" fill="#387ed1"/>
              <path d="M15 35 L35 25 L55 15 L75 20" stroke="#387ed1" strokeWidth="3" fill="none"/>
              <circle cx="15" cy="35" r="4" fill="#387ed1"/>
              <circle cx="35" cy="25" r="4" fill="#387ed1"/>
              <circle cx="55" cy="15" r="4" fill="#387ed1"/>
              <circle cx="75" cy="20" r="4" fill="#387ed1"/>
            </svg>
            <h3>Stocks & IPO</h3>
            <p>
              Invest in individual stocks or apply for IPOs with your Zerodha demat account.
            </p>
          </div>

          {/* Mutual Funds */}
          <div className="option-card">
            <svg className="option-icon" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="35" stroke="#387ed1" strokeWidth="8" fill="none"/>
              <path d="M50 50 L50 15 A35 35 0 0 1 75 65 Z" fill="#387ed1" opacity="0.7"/>
              <path d="M50 50 L75 65 A35 35 0 0 1 35 80 Z" fill="#387ed1" opacity="0.5"/>
              <path d="M50 50 L35 80 A35 35 0 0 1 50 15 Z" fill="#387ed1" opacity="0.3"/>
            </svg>
            <h3>Mutual Funds</h3>
            <p>
              Invest in mutual funds with zero commission on direct plans through Coin.
            </p>
          </div>

          {/* F&O */}
          <div className="option-card">
            <svg className="option-icon" viewBox="0 0 100 100" fill="none">
              <path d="M20 80 Q30 20, 50 50 T80 80" stroke="#387ed1" strokeWidth="4" fill="none"/>
              <rect x="15" y="75" width="10" height="10" fill="#387ed1"/>
              <rect x="45" y="45" width="10" height="10" fill="#387ed1"/>
              <rect x="75" y="75" width="10" height="10" fill="#387ed1"/>
              <circle cx="50" cy="30" r="15" stroke="#387ed1" strokeWidth="3" fill="none"/>
              <path d="M45 30 L50 35 L60 25" stroke="#387ed1" strokeWidth="2" fill="none"/>
            </svg>
            <h3>Futures & Options</h3>
            <p>
              Trade in equity and commodity futures and options with leverage.
            </p>
          </div>

          {/* Currency */}
          <div className="option-card">
            <svg className="option-icon" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="35" stroke="#387ed1" strokeWidth="4" fill="none"/>
              <text x="50" y="65" fontSize="40" fontWeight="bold" fill="#387ed1" textAnchor="middle">₹</text>
              <path d="M20 30 L30 20 M70 30 L80 20 M20 70 L30 80 M70 70 L80 80" stroke="#387ed1" strokeWidth="2"/>
            </svg>
            <h3>Currency</h3>
            <p>
              Trade in currency derivatives on NSE, BSE, and MCX-SX platforms.
            </p>
          </div>

          {/* Commodities */}
          <div className="option-card">
            <svg className="option-icon" viewBox="0 0 100 100" fill="none">
              <rect x="25" y="40" width="50" height="40" stroke="#387ed1" strokeWidth="3" fill="none"/>
              <rect x="30" y="35" width="40" height="5" fill="#387ed1"/>
              <circle cx="35" cy="55" r="8" fill="#FFD700"/>
              <circle cx="65" cy="55" r="8" fill="#FFD700"/>
              <circle cx="50" cy="70" r="6" fill="#C0C0C0"/>
              <path d="M40 20 L50 10 L60 20 L50 30 Z" fill="#387ed1"/>
            </svg>
            <h3>Commodities</h3>
            <p>
              Trade in commodities like gold, silver, crude oil, and more on MCX.
            </p>
          </div>

          {/* Government Securities */}
          <div className="option-card">
            <svg className="option-icon" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="25" width="60" height="50" stroke="#387ed1" strokeWidth="3" fill="none" rx="3"/>
              <rect x="25" y="30" width="50" height="8" fill="#387ed1"/>
              <line x1="30" y1="45" x2="70" y2="45" stroke="#387ed1" strokeWidth="2"/>
              <line x1="30" y1="52" x2="60" y2="52" stroke="#387ed1" strokeWidth="2"/>
              <line x1="30" y1="59" x2="65" y2="59" stroke="#387ed1" strokeWidth="2"/>
              <circle cx="50" cy="15" r="8" fill="#387ed1"/>
              <path d="M47 15 L49 17 L54 12" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
            <h3>Government Securities</h3>
            <p>
              Invest in government bonds and treasury bills through your demat account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestmentOptions;