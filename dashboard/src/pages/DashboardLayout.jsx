import React from "react";
import Watchlist from "./Watchlist";
import Operations from "./Operations";
import "./DashboardLayout.css";

const DashboardLayout = () => (
  <div className="dashboard-container">
    {/* Left Sidebar - Watchlist */}
    <div className="sidebar">
      <Watchlist />
    </div>

    {/* Right Main Content - Operations */}
    <div className="main-content">
      <Operations />
    </div>
  </div>
);

export default DashboardLayout;
