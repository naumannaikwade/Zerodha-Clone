import React from "react";

function RightSection({ imageURL, productName, productDescription, links }) {
  return (
    <div className="container my-5">
      <div className="row d-flex align-items-center">
        {/* Text Section */}
        <div className="col-md-5 col-12 p-4 mt-md-5 mt-4">
          <h1 className="mb-3">{productName}</h1>
          <p className="text-secondary">{productDescription}</p>

          {/* Links - Now dynamically rendered */}
          <div className="section-links mt-3">
            {links &&
              links.map((link, index) => (
                <a
                  href={link.url}
                  key={index}
                  className={index < links.length - 1 ? "me-4" : ""}
                >
                  {link.text}{" "} &nbsp;
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                </a>
              ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="col-md-7 col-12 text-center">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{ maxWidth: "90%", margin: "2rem auto" }}
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;