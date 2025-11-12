import React from 'react';
import './Brokerage.css';

export default function Brokerage() {
  return (
    <div className="brokerage-container border-top">
      <h1 className="main-title">Charges explained</h1>
      
      <div className="content-wrapper">
        <div className="left-column">
          <section>
            <h2>Securities/Commodities transaction tax</h2>
            <p>Tax by the government when transacting on the exchanges. Charged as above on both buy and sell sides when trading equity delivery. Charged only on selling side when trading intraday or on F&O.</p>
            <p className="note">When trading at Zerodha, STT/CTT can be a lot more than the brokerage we charge. Important to keep a tab.</p>
          </section>

          <section>
            <h2>Transaction/Turnover Charges</h2>
            <p>Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.</p>
            <p>BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been merged into a new group X w.e.f 01.12.2017)</p>
            <p>BSE has revised transaction charges in S5 and ST groups to ₹1,00,000 per crore of gross turnover.</p>
            <p>BSE has revised transaction charges for group A, B and other non exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC, W, T) at ₹375 per crore of turnover on flat rate basis w.e.f. December 1, 2022.</p>
            <p>BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.</p>
          </section>

          <section>
            <h2>Call & trade</h2>
            <p>Additional charges of ₹50 per order for orders placed through a dealer at Zerodha including auto square off orders.</p>
          </section>

          <section>
            <h2>Stamp charges</h2>
            <p>Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.</p>
          </section>

          <section>
            <h2>NRI brokerage charges</h2>
            <ul>
              <li>For a non PIS account, 0.5% or ₹50 per executed order for equity and F&O (whichever is lower).</li>
              <li>For a PIS account, 0.5% or ₹200 per executed order for equity (whichever is lower).</li>
              <li>₹500 + GST as yearly account maintenance charges (AMC) charges.</li>
            </ul>
          </section>

          <section>
            <h2>Account with debit balance</h2>
            <p>If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.</p>
          </section>

          <section>
            <h2>Charges for Investor's Protection Fund Trust (IPFT) by NSE</h2>
            <ul>
              <li>Equity and Futures - ₹10 per crore + GST of the traded value.</li>
              <li>Options - ₹50 per crore + GST traded value (premium value).</li>
              <li>Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2 per lakh + GST of premium for Options.</li>
            </ul>
          </section>

          <section>
            <h2>Margin Trading Facility (MTF)</h2>
            <ul>
              <li>MTF Interest: 0.04% per day (₹40 per lakh) on the funded amount. The interest is applied from T+1 day until the day MTF stocks are sold.</li>
              <li>MTF Brokerage: 0.3% or Rs. 20/executed order, whichever is lower.</li>
              <li>MTF pledge charge: ₹15 + GST per pledge and unpledge request per ISIN.</li>
            </ul>
          </section>

          <section>
            <h2>Disclaimer</h2>
            <p>For Delivery based trades, a minimum of ₹0.01 will be charged per contract note. Clients who opt to receive physical contract notes will be charged ₹20 per contract note plus courier charges. Brokerage will not exceed the rates specified by SEBI and the exchanges. All statutory and regulatory charges will be levied at actuals. Brokerage is also charged on expired, exercised, and assigned options contracts. Free investments are available only for our retail individual clients. Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as delivery brokerage. A brokerage of 0.25% of the contract value will be charged for contracts where physical delivery happens. For netted off positions in physically settled contracts, a brokerage of 0.1% will be charged.</p>
          </section>
        </div>

        <div className="right-column">
          <section>
            <h2>GST</h2>
            <p>Tax levied by the government on the services rendered. 18% of ( brokerage + SEBI charges + transaction charges)</p>
          </section>

          <section>
            <h2>SEBI Charges</h2>
            <p>Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.</p>
          </section>

          <section>
            <h2>DP (Depository participant) charges</h2>
            <p>₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged on the trading account ledger when stocks are sold, irrespective of quantity.</p>
            <p>Female demat account holders (as first holder) will enjoy a discount of ₹0.25 per transaction on the CDSL fee.</p>
            <p>Debit transactions of mutual funds & bonds get an additional discount of ₹0.25 on the CDSL fee.</p>
          </section>

          <section>
            <h2>Pledging charges</h2>
            <p>₹30 + GST per pledge request per ISIN.</p>
          </section>

          <section>
            <h2>AMC (Account maintenance charges)</h2>
            <p>For BSDA demat account: Zero charges if the holding value is less than ₹4,00,000. To learn more about BSDA, <a href="#">Click here</a></p>
            <p>For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly (90 days). To learn more about AMC, <a href="#">Click here</a></p>
          </section>

          <section>
            <h2>Corporate action order charges</h2>
            <p>₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.</p>
          </section>

          <section>
            <h2>Off-market transfer charges</h2>
            <p>₹25 per transaction.</p>
          </section>

          <section>
            <h2>Physical CMR request</h2>
            <p>First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST for subsequent requests.</p>
          </section>

          <section>
            <h2>Payment gateway charges</h2>
            <p>₹9 + GST (Not levied on transfers done via UPI)</p>
          </section>

          <section>
            <h2>Delayed Payment Charges</h2>
            <p>Interest is levied at 18% a year or 0.05% per day on the debit balance in your trading account. <a href="#">Learn more.</a></p>
          </section>

          <section>
            <h2>Trading using 3-in-1 account with block functionality</h2>
            <ul>
              <li>Delivery & MTF Brokerage: 0.5% per executed order.</li>
              <li>Intraday Brokerage: 0.05% per executed order.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}