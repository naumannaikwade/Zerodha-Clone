import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const username = user?.username || "USER";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-logo" onClick={isMobile ? () => setMenuOpen(!menuOpen) : undefined}>
          <img src="/media/Logo.png" alt="logo" />
          {isMobile && <span className="menu-text">Menu</span>}
        </div>

        {!isMobile && (
          <div className="navbar-links">
            <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>Dashboard</NavLink>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>Orders</NavLink>
            <NavLink to="/holdings" className={({ isActive }) => (isActive ? "active" : "")}>Holdings</NavLink>
            <NavLink to="/positions" className={({ isActive }) => (isActive ? "active" : "")}>Positions</NavLink>
            <NavLink to="/funds" className={({ isActive }) => (isActive ? "active" : "")}>Funds</NavLink>
            <NavLink to="/apps" className={({ isActive }) => (isActive ? "active" : "")}>Apps</NavLink>
          </div>
        )}

        <div className="navbar-user">
          <span>{username}</span>
          <button className="hide-on-tablet" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {isMobile && (
        <>
          <div className={`sidebar-overlay ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(false)} />
          <div className={`sidebar-nav ${menuOpen ? "active" : ""}`}>
            <div className="sidebar-header">
              <div className="sidebar-user">
                <img src="/media/Logo.png" alt="user" className="sidebar-user-img" />
                <div className="sidebar-user-info">
                  <span className="sidebar-username">{username}</span>
                  <span className="sidebar-user-email">{user?.email || "Welcome"}</span>
                </div>
              </div>
              <button className="sidebar-close" onClick={() => setMenuOpen(false)}>×</button>
            </div>

            <div className="sidebar-links">
              {[
                ["Dashboard", "/home"],
                ["Orders", "/orders"],
                ["Holdings", "/holdings"],
                ["Positions", "/positions"],
                ["Funds", "/funds"],
                ["Apps", "/apps"],
              ].map(([label, path]) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {label}
                </NavLink>
              ))}
            </div>

            <div className="sidebar-footer">
              <button onClick={handleLogout} className="sidebar-logout">Logout</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;