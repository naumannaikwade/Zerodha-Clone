import React from "react";

function Awards() {
  return (
    <div className="container py-5 my-5">
      <div className="row align-items-center gx-5">
        {/* Left Image */}
        <div className="col-md-6 text-start mb-4 mb-md-0">
          <img 
            src="media/images/largestBroker.svg" 
            alt="Largest Broker" 
            className="img-fluid"
            style={{ maxWidth: "80%" }}
          />
        </div>

        {/* Right Content */}
        <div className="col-md-6">
          <h1 className="fs-2 mb-3">Largest stock broker in India</h1>
          <p className="mb-4">
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>

          <div className="row">
            <div className="col-6">
              <ul className="list-unstyled">
                <li className="mt-2">Futures and Options</li>
                <li className="mt-2">Commodity derivatives</li>
                <li className="mt-2">Currency derivatives</li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="list-unstyled">
                <li className="mt-2">Stocks & IPOs</li>
                <li className="mt-2">Direct mutual funds</li>
                <li className="mt-2">Bonds and Govt. Securities</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 text-center">
            <img
              src="media/images/pressLogos.png"
              alt="Press Logos"
              className="img-fluid"
              style={{ maxWidth: "90%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
