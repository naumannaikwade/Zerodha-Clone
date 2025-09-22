import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from '../store/useAuthStore';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Close menu when switching to desktop
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let username = "USER123";
  if (user?.username) username = user.username;
  else {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        username = payload.username || username;
      }
    } catch {}
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="navbar">
        {/* Left - Logo (Clickable for mobile menu) */}
        <div 
          className="navbar-logo"
          onClick={isMobile ? toggleMenu : undefined}
          style={{ cursor: isMobile ? 'pointer' : 'default' }}
        >
          <img src="/media/Logo.png" alt="logo" />
          {isMobile && <span className="menu-text">Menu</span>}
        </div>

        {/* Center - Links (Visible on desktop) */}
        {!isMobile && (
          <div className="navbar-links">
            <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
            <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : ''}>Orders</NavLink>
            <NavLink to="/holdings" className={({ isActive }) => isActive ? 'active' : ''}>Holdings</NavLink>
            <NavLink to="/positions" className={({ isActive }) => isActive ? 'active' : ''}>Positions</NavLink>
            <NavLink to="/funds" className={({ isActive }) => isActive ? 'active' : ''}>Funds</NavLink>
            <NavLink to="/apps" className={({ isActive }) => isActive ? 'active' : ''}>Apps</NavLink>
          </div>
        )}

        {/* Right - User Info */}
        <div className="navbar-user">
          <span>{username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && (
        <>
          <div 
            className={`sidebar-overlay ${menuOpen ? 'active' : ''}`}
            onClick={closeMenu}
          />
          
          <div className={`sidebar-nav ${menuOpen ? 'active' : ''}`}>
            <div className="sidebar-header">
              <div className="sidebar-user">
                <img src="/media/Logo.png" alt="user" className="sidebar-user-img" />
                <div className="sidebar-user-info">
                  <span className="sidebar-username">{username}</span>
                  <span className="sidebar-user-email">{user?.email || 'Welcome!'}</span>
                </div>
              </div>
              <button className="sidebar-close" onClick={closeMenu}>×</button>
            </div>

            <div className="sidebar-links">
              <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
                <span className="sidebar-icon">📊</span> Dashboard
              </NavLink>
              <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
                <span className="sidebar-icon">📋</span> Orders
              </NavLink>
              <NavLink to="/holdings" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
                <span className="sidebar-icon">📈</span> Holdings
              </NavLink>
              <NavLink to="/positions" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
                <span className="sidebar-icon">💼</span> Positions
              </NavLink>
              <NavLink to="/funds" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
                <span className="sidebar-icon">💰</span> Funds
              </NavLink>
              <NavLink to="/apps" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
                <span className="sidebar-icon">🔧</span> Apps
              </NavLink>
            </div>

            <div className="sidebar-footer">
              <button onClick={handleLogout} className="sidebar-logout">
                <span className="sidebar-icon">🚪</span> Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;