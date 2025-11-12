import React from "react";
import { useNavigate } from "react-router-dom";

function Universe() {
  const navigate = useNavigate();

   const handleSignup = () => {
    navigate("/signup"); // Navigate to signup page route
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="text-center">
        <h1 style={{fontSize:"1.5rem"}} className="mb-4">The Zerodha Universe</h1>
        <p style={{fontSize:"1.125rem"}}>
          Extend your trading and investment experience even further with our<br/>
          partner platforms
        </p>
        <div className="row">
        <div className="col-4 p-3 mt-5">
          <img src="media/images/zerodhaFundhouse.png" style={{width:"55%",marginBottom:"1rem"}}/>
          <p className=" text-muted" style={{fontSize:"0.77rem"}}>Our asset management venture<br/>
that is creating simple and transparent index<br/>
funds to help you save for your goals.
</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/sensibullLogo.svg"  style={{width:"70%",marginBottom:"1rem"}}/>
          <p className=" text-muted" style={{fontSize:"0.77rem"}}>Options trading platform that lets you<br/>
create strategies, analyze positions, and examine<br/>
data points like open interest, FII/DII, and more.
</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/goldenpiLogo.png"  style={{width:"60%",marginBottom:"1rem"}}/>
          <p className=" text-muted" style={{fontSize:"0.77rem"}}>Investment research platform<br/>
that offers detailed insights on stocks,<br/>
sectors, supply chains, and more.</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/streakLogo.png"  style={{width:"55%",marginBottom:"1rem"}}/>
          <p className=" text-muted" style={{fontSize:"0.77rem"}}>Systematic trading platform<br/>
that allows you to create and backtest<br/>
strategies without coding.</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png"  style={{width:"65%",marginBottom:"1rem"}}/>
          <p className=" text-muted" style={{fontSize:"0.77rem"}}>Thematic investing platform<br/>
that helps you invest in diversified<br/>
baskets of stocks on ETFs.</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/dittoLogo.png"  style={{width:"40%",marginBottom:"1rem"}}/>
          <p className="text-muted" style={{fontSize:"0.77rem"}}>Personalized advice on life<br/>
and health insurance. No spam<br/>
and no mis-selling.</p>
        </div>
        </div>
        <button
          className="p-2 btn btn-primary fs-5 mb-5" 
          style={{ width: "20%", margin: "0 auto",marginTop:"3rem" }}
          onClick={handleSignup}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;
