import React from "react";
import { useSwipeable } from "react-swipeable";
import Watchlist from "../components/Watchlist.js";
import Operations from "./Operations.js";
import useUiStore from "../store/useUiStore.js";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const activeTab = useUiStore((state) => state.activePanel);
  const setActiveTab = useUiStore((state) => state.setActivePanel);

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveTab("operations"),
    onSwipedRight: () => setActiveTab("watchlist"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
  });

  return (
    <div className="trading-layout" {...handlers}>
      <nav className="trading-layout__tabs" aria-label="Dashboard sections">
        <button
          type="button"
          className={activeTab === "watchlist" ? "active" : ""}
          aria-pressed={activeTab === "watchlist"}
          onClick={() => setActiveTab("watchlist")}
        >
          Watchlist
        </button>
        <button
          type="button"
          className={activeTab === "operations" ? "active" : ""}
          aria-pressed={activeTab === "operations"}
          onClick={() => setActiveTab("operations")}
        >
          Portfolio
        </button>
      </nav>

      <aside
        className={`trading-layout__watchlist ${activeTab === "watchlist" ? "is-active" : ""}`}
      >
        <Watchlist />
      </aside>

      <main
        className={`trading-layout__workspace ${activeTab === "operations" ? "is-active" : ""}`}
      >
        <Operations />
      </main>
    </div>
  );
};

export default DashboardLayout;
