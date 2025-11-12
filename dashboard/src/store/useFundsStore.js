// store/useFundsStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/funds"; // backend URL

const useFundsStore = create((set, get) => ({
  funds: { equity: 0, commodity: 0, currency: 0 },
  transactions: [],
  loading: false,
  error: null,

  // ✅ Fetch funds from backend
  fetchFunds: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(API_URL, { withCredentials: true });
      set({ funds: res.data, transactions: res.data.transactions || [], loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch funds",
        loading: false,
      });
    }
  },

  // ✅ Add demo funds
  addDemoFunds: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/add-demo`, {}, { withCredentials: true });
      set({ funds: res.data.funds, transactions: res.data.funds.transactions, loading: false });
      return { success: true, message: "Demo funds added successfully" };
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to add demo funds",
        loading: false,
      });
      return { success: false, error: err.response?.data?.message || "Failed to add demo funds" };
    }
  },

  // ✅ Update funds dynamically
  setFunds: (newFunds) => set({ funds: newFunds, transactions: newFunds.transactions || [] }),

  // ✅ Clear error
  clearError: () => set({ error: null }),

  // ✅ Helper functions
  getTotalBalance: () => {
    const f = get().funds;
    return (f.equity || 0) + (f.commodity || 0) + (f.currency || 0);
  },
  getTotalMarginUsed: () => {
    const f = get().funds;
    return (
      Math.floor((f.equity || 0) * 0.2) +
      Math.floor((f.commodity || 0) * 0.2) +
      Math.floor((f.currency || 0) * 0.2)
    );
  },
  getTotalAvailable: () => {
    const f = get().funds;
    const marginUsed = get().getTotalMarginUsed();
    return get().getTotalBalance() - marginUsed;
  },
}));

export default useFundsStore;