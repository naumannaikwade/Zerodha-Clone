// dashboard/src/store/useFundsStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const useFundsStore = create((set, get) => ({
  funds: { equity: 0, commodity: 0, currency: 0 },
  transactions: [],
  loading: false,
  error: null,

  fetchFunds: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/api/funds`, { withCredentials: true });
      set({ funds: res.data, transactions: res.data.transactions || [], loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch funds", loading: false });
    }
  },

  addDemoFunds: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/api/funds/add-demo`, {}, { withCredentials: true });
      set({ funds: res.data.funds, transactions: res.data.funds.transactions, loading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to add demo funds", loading: false });
      return { success: false };
    }
  },

  setFunds: (newFunds) => set({ funds: newFunds, transactions: newFunds.transactions || [] }),
  clearError: () => set({ error: null }),

  getTotalBalance: () => {
    const f = get().funds;
    return (f.equity || 0) + (f.commodity || 0) + (f.currency || 0);
  },
  getTotalMarginUsed: () => {
    const f = get().funds;
    return Math.floor((f.equity || 0) * 0.2) + Math.floor((f.commodity || 0) * 0.2) + Math.floor((f.currency || 0) * 0.2);
  },
  getTotalAvailable: () => get().getTotalBalance() - get().getTotalMarginUsed(),
}));

export default useFundsStore;
