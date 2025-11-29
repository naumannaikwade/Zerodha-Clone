import React from "react";

function Team() {
  return (
    <div className="container border-top">
      <div className="p-3 mt-5  mt-5 pt-5">
        <h1 className="text-center" style={{fontSize:"1.5rem"}}>People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.025rem" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/nithinKamath.jpg"
            style={{ borderRadius: "100%", width: "55%" }}
          />
          <h4 className="mt-4" style={{fontSize:"1.125rem"}}>Nithin Kamath</h4>
          <h6 className="mt-4" style={{fontSize:"1rem"}}>Founder, CEO</h6>
        </div>
        <div className="col-6 p-3 text-start" style={{marginLeft:"-75px",marginTop:"20px"}}>
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on <a href="">Homepage</a> / <a href="">TradingQnA</a> /{" "}
            <a href="">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
