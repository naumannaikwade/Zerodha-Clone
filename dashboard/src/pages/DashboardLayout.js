import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Routes, Route } from "react-router-dom";
import Watchlist from "../components/Watchlist.js";
import Operations from "./Operations.js";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("watchlist");

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
        <Routes>
          <Route path="*" element={<Operations />} />
        </Routes>
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