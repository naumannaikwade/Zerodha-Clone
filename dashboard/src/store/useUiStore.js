import { create } from "zustand";

const useUiStore = create((set) => ({
  activePanel: "watchlist",
  setActivePanel: (activePanel) => set({ activePanel }),
}));

export default useUiStore;
