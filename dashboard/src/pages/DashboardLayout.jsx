import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Watchlist from "../components/Watchlist.js";
import Operations from "./Operations";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("watchlist");

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveTab("operations"),
    onSwipedRight: () => setActiveTab("watchlist"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="dashboard-container">
      {/* Desktop Layout */}
      <div className="sidebar desktop-only">
        <Watchlist />
      </div>
      <div className="main-content desktop-only">
        <Operations />
      </div>

      {/* Mobile / Tablet Layout */}
      <div className="mobile-navbar mobile-only">
        <div className="mobile-tabs">
          <button
            className={activeTab === "watchlist" ? "active" : ""}
            onClick={() => setActiveTab("watchlist")}
          >
            Watchlist
          </button>
          <button
            className={activeTab === "operations" ? "active" : ""}
            onClick={() => setActiveTab("operations")}
          >
            Operations
          </button>
        </div>

        <div className="mobile-content" {...handlers}>
          {activeTab === "watchlist" && <Watchlist />}
          {activeTab === "operations" && <Operations />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;