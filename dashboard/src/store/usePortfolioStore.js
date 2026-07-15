import { create } from "zustand";
import api from "../api/client";

const fetchCollection = async (path, key, set) => {
  set((state) => ({
    loading: { ...state.loading, [key]: true },
    errors: { ...state.errors, [key]: null },
  }));

  try {
    const response = await api.get(path);
    set({ [key]: Array.isArray(response.data) ? response.data : [] });
  } catch (error) {
    set((state) => ({
      errors: {
        ...state.errors,
        [key]: error.response?.data?.message || `Failed to fetch ${key}`,
      },
    }));
  } finally {
    set((state) => ({ loading: { ...state.loading, [key]: false } }));
  }
};

const usePortfolioStore = create((set) => ({
  holdings: [],
  positions: [],
  orders: [],
  loading: { holdings: false, positions: false, orders: false },
  errors: { holdings: null, positions: null, orders: null },

  fetchHoldings: () => fetchCollection("/api/holdings", "holdings", set),
  fetchPositions: () => fetchCollection("/api/positions", "positions", set),
  fetchOrders: () => fetchCollection("/api/orders", "orders", set),
  reset: () => set({
    holdings: [],
    positions: [],
    orders: [],
    errors: { holdings: null, positions: null, orders: null },
  }),
}));

export default usePortfolioStore;
