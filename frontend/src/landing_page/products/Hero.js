import React from "react";

function Hero() {
  return (
    <div className="container border-bottom my-5 py-2">
      <div className="text-center mt-4 mb-4 p-3" style={{color:"#444444"}}>
        <h1 style={{fontSize:"1.9rem",color:"#444444"}}>Zerodha Products</h1>
        <h3 className="mt-3" style={{color:"#444444",fontSize:"1.3rem",fontWeight:"400"}}>
          Sleek, modern and intuitive trading platforms
        </h3>
        <p className="mt-3 mb-5">
          Check out our{" "}
          <a href="" style={{ textDecoration: "none",fontSize:"1rem" }}>
            investment offerings{" "}
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;
