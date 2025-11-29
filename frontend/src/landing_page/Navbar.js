import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="navbar-brand" href="/" onClick={closeMenu}>
          <img
            src="media/images/logo.svg"
            alt="Logo"
          />
        </a>
        <button
          className={`navbar-toggler ${isMenuOpen ? "active" : ""}`}
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarSupportedContent">
          <form className="navbar-form" role="search">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/signup" onClick={closeMenu}>
                  Signup
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/about" onClick={closeMenu}>
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/product" onClick={closeMenu}>
                  Product
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/pricing" onClick={closeMenu}>
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/support" onClick={closeMenu}>
                  Support
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;