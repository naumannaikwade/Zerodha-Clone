import { create } from "zustand";
import api from "../api/client";

const useMarketStore = create((set) => ({
  stocks: [],
  loading: false,
  error: null,
  lastUpdated: null,

  fetchStocks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/api/stocks");
      set({ stocks: response.data || [], lastUpdated: new Date() });
    } catch (error) {
      set({
        stocks: [],
        error: error.response?.data?.message || "Failed to fetch stocks",
      });
    } finally {
      set({ loading: false });
    }
  },
  reset: () => set({ stocks: [], error: null, lastUpdated: null }),
}));

export default useMarketStore;
