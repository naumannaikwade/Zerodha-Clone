import React from "react";
import { useEffect } from "react";

import Signup from "./Signup";
import InvestmentOptions from "./InvestmentOptions";

function SignupPage() {
    
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

  return (
    <>
      <Signup />
      <InvestmentOptions />
    </>
  );
}

export default SignupPage;
