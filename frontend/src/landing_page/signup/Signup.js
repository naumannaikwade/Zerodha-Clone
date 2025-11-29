import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSignup = () => {
    window.open("https://xzerodhadashboard.onrender.com", "_blank");
  };

  return (
    <div className="signup-page mt-3" style={{marginBottom:"2rem"}}>
      {/* Hero Section */}
      <div className="hero-section ">
        <h1>Open a free demat and trading account online</h1>
        <p>Start investing brokerage free and join a community of 1.6+ crore investors and traders</p>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Side - Products */}
        <div className="products-section">
          <img 
            src="media/images/signup.png" 
            alt="Zerodha Products" 
            className="products-image"
          />
        </div>

        {/* Right Side - Signup Form */}
        <div className="signup-section">
          <h2>Signup now</h2>
          <p className="subtitle">Or track your existing application</p>

          <button className="otp-button" onClick={handleSignup}>
            Click here to go to Signup page
          </button>

          <p className="terms-text">
            By proceeding, you agree to the Zerodha <a href="#">terms & privacy policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;