import { create } from "zustand";
import api from "../api/client";

const emptyFunds = { equity: 0, commodity: 0, currency: 0 };

const useFundsStore = create((set, get) => ({
  funds: emptyFunds,
  transactions: [],
  loading: false,
  error: null,

  fetchFunds: async () => {
    if (!localStorage.getItem("token")) return;
    set({ loading: true, error: null });
    try {
      const response = await api.get("/api/funds");
      set({
        funds: response.data,
        transactions: response.data.transactions || [],
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to fetch funds" });
    } finally {
      set({ loading: false });
    }
  },

  addDemoFunds: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/api/funds/add-demo");
      if (!response.data.success) {
        const message = response.data.error || "Failed to add demo funds";
        set({ error: message });
        return { success: false, error: message };
      }
      set({
        funds: response.data.funds,
        transactions: response.data.funds.transactions || [],
      });
      return {
        success: true,
        message: response.data.message || "Demo funds added successfully",
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add demo funds";
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
  reset: () => set({ funds: emptyFunds, transactions: [], error: null }),
  getTotalBalance: () => {
    const { funds } = get();
    return (funds.equity || 0) + (funds.commodity || 0) + (funds.currency || 0);
  },
  getTotalMarginUsed: () => {
    const { funds } = get();
    return [funds.equity, funds.commodity, funds.currency].reduce(
      (total, value) => total + Math.floor((value || 0) * 0.2),
      0
    );
  },
  getTotalAvailable: () => get().getTotalBalance() - get().getTotalMarginUsed(),
}));

export default useFundsStore;
