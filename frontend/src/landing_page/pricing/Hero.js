import React from "react";

function Hero() {
  return (
    <div className="container py-5 my-5 text-center">
      {/* Main Heading Section - Corrected */}
      <div className="row mb-5 pb-5">
        <div className="col">
          <h1 style={{fontSize:"2rem",marginBottom:"1.25rem"}}>Charges</h1>
          <p className=" text-muted pb-3" style={{fontSize:"1.25rem"}}>List of all charges and taxes</p>
        </div>
      </div>

      {/* Three Columns Section */}
      <div className="row mt-5 pt-5" >
        {/* Column 1: Free equity delivery */}
        <div className="col-md-4 px-5">
          <img src="media/images/pricingEquity.svg" alt="₹0 charge icon" style={{width:"90%"}}/>
          <h2 className="mt-4" style={{fontSize:"1.95rem"}}>Free equity delivery</h2>
          <p className="text-muted mt-3">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.
          </p>
        </div>

        {/* Column 2: Intraday and F&O */}
        <div className="col-md-4 ">
          <img src="media/images/intradayTrades.svg" alt="₹20 charge icon" className="px-5" style={{width:"101%"}}/>
          <h2 className="mt-4" style={{fontSize:"1.95rem",width:"100%"}}>Intraday and F&O trades</h2>
          {/* Corrected description */}
          <p className="text-muted mt-3">
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>

        {/* Column 3: Free direct MF */}
        <div className="col-md-4 px-5">
          <img src="media/images/pricingEquity.svg" alt="₹0 charge icon" style={{width:"90%"}}/>
          <h2 className="fs-3 mt-4">Free direct MF</h2>
          <p className="text-muted mt-3">
            All direct mutual fund investments are absolutely free — ₹ 0
            commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;