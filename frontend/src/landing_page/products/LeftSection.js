import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  links, // Changed from tryDemo, learnMore
  googlePlay,
  appStore,
}) {
  return (
    <div className="container my-5 align-items-center">
      <div className="row">
        {/* Image Section */}
        <div className="col-md-7 col-12 p-3 text-center">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{ maxWidth: "90%" }}
          />
        </div>

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
                  style={{marginRight:"2rem"}}
                >
                  {link.text}{" "}&nbsp; 
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                </a>
              ))}
          </div>

          {/* App Store Badges */}
          <div className="mt-4">
            {googlePlay && (
              <a href={googlePlay}>
                <img
                  src="media/images/googlePlayBadge.svg"
                  alt="Google Play Store"
                  className="img-fluid"
                  style={{ maxWidth: "150px", marginRight:"2rem"}}
                />
              </a>
            )}
            {appStore && (
              <a href={appStore}>
                <img
                  src="media/images/appstoreBadge.svg"
                  alt="Apple App Store"
                  className="img-fluid ms-4"
                  style={{ maxWidth: "150px" }}
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;