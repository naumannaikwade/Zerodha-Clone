import React from "react";
import { useNavigate } from "react-router-dom";
import SignupPage from "./signup/SignupPage";

function OpenAccount() {
   const navigate = useNavigate();

   const handleSignup = () => {
    navigate("/signup"); // Navigate to signup page route
  };

  return (
    <div className="container py-5 mb-5">
      <div className="row justify-content-center text-center">
        <div className="col-md-8">
          <h1 className="mt-5 mb-3">Open a Zerodha account</h1>
          <p className="mb-4">
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
            F&O trades.
          </p>
          <button
            className="btn btn-primary btn-md p-2"
            style={{width:"25%"}}
            onClick={handleSignup}
          >
            Signup Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
