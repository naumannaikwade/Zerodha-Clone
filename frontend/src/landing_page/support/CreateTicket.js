import React from "react";

function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2">To create a ticket, select a relevant topic</h1>
        
        {/* Account Opening */}
        <div className="col-4 p-5 mt-2 mb-2">
          <h4 className="" style={{ whiteSpace: "nowrap" }}>
            <i className="fa fa-plus-circle" aria-hidden="true"></i> Account Opening
          </h4>
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Online Account Opening
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Offline Account Opening
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Company, Partnership and HUF Account Opening
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            NRI Account Opening
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Charges at Zerodha
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Zerodha IDFC FIRST Bank 3-in-1 Account
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Getting Started
          </a>
          <br />
        </div>

        {/* Your Zerodha Account */}
        <div className="col-4 p-5 mt-2 mb-2">
          <h4 className="" style={{ whiteSpace: "nowrap" }}>
            <i className="fa fa-user" aria-hidden="true"></i> Your Zerodha Account
          </h4>
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Login Credentials
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Account Modification and Segment Addition
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            DP ID and Bank Details
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Your Profile
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Transfer and Conversion of Shares
          </a>
          <br />
        </div>

        {/* Trading and Markets */}
        <div className="col-4 p-5 mt-2 mb-2">
          <h4 className="" style={{ whiteSpace: "nowrap" }}>
            <i className="fa fa-bar-chart" aria-hidden="true"></i> Trading and Markets
          </h4>
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Margin/Leverage, Product and Order Types
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Kite Web and Mobile
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Trading FAQs
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Corporate Actions
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Sentinel
          </a>
          <br />
        </div>

        {/* Funds */}
        <div className="col-4 p-5 mt-2 mb-2">
          <h4 className="" style={{ whiteSpace: "nowrap" }}>
            <i className="fa fa-credit-card" aria-hidden="true"></i> Funds
          </h4>
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Adding Funds
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Fund Withdrawal
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            eMandates
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Adding Bank Accounts
          </a>
          <br />
        </div>

        {/* Console */}
        <div className="col-4 p-5 mt-2 mb-2">
          <h4 className="" style={{ whiteSpace: "nowrap" }}>
            <i className="fa fa-television" aria-hidden="true"></i> Console
          </h4>
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Reports
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Ledger
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Portfolio
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Profile
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Funds Statement
          </a>
          <br />
        </div>

        {/* Coin */}
        <div className="col-4 p-5 mt-2 mb-2">
          <h4 className="" style={{ whiteSpace: "nowrap" }}>
            <i className="fa fa-circle-o" aria-hidden="true"></i> Coin
          </h4>
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Understanding Mutual Funds
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            About Coin
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Buying and Selling
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Starting an SIP
          </a>
          <br />
          <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Managing Your Portfolio
          </a>
          <br />
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;