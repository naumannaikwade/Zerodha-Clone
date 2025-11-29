import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

   const handleSignup = () => {
    navigate("/signup"); // Navigate to signup page route
  };
  return (
    <div className="container p-5 mb-5 py-5">
      <div className="row text-center">
        <img
          src="media/images/homeHero.png"
          alt="Hero Image"
          className="mb-5"
          style={{width:"100%", margin:"0 auto"}}
        />
        </div>
        <div>
          <h1 className="mt-5 text-center">Invest in everything</h1>
        <p className="text-center">
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        <button
          className="p-2 btn btn-primary fs-3 mb-5 d-flex justify-content-center"
          style={{ width: "20%", margin: "0 auto" }}
          onClick={handleSignup}
        >
          Signup Now
        </button>
        </div>
        
      </div>

  );
}

export default Hero;
