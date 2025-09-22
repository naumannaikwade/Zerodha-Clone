// src/store/useFundsStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "https://zerodha-clone-5t7q.onrender.com";

const useFundsStore = create((set, get) => ({
  funds: { equity: 0, commodity: 0, currency: 0 },
  holdings: [],
  positions: [],
  orders: [],
  loading: false,
  error: null,

  // ------------------- FUNDS -------------------
  fetchFunds: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/api/funds`, { withCredentials: true });
      set({ funds: res.data.funds, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch funds", loading: false });
    }
  },

  addDemoFunds: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/api/funds/add-demo`, {}, { withCredentials: true });
      set({ funds: res.data.funds, loading: false });
      return { success: true, message: res.data.message };
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to add demo funds", loading: false });
      return { success: false };
    }
  },

  // ------------------- HOLDINGS -------------------
  fetchHoldings: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/api/holdings`, { withCredentials: true });
      set({ holdings: res.data.holdings || [], loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch holdings", loading: false });
    }
  },

  // ------------------- POSITIONS -------------------
  fetchPositions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/api/positions`, { withCredentials: true });
      set({ positions: res.data.positions || [], loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch positions", loading: false });
    }
  },

  // ------------------- ORDERS -------------------
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/api/orders`, { withCredentials: true });
      set({ orders: res.data.orders || [], loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch orders", loading: false });
    }
  },

  // ------------------- BUY STOCK -------------------
  buyStock: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/api/orders/buy`, data, { withCredentials: true });
      // Refresh all data
      await get().fetchFunds();
      await get().fetchHoldings();
      await get().fetchPositions();
      await get().fetchOrders();
      set({ loading: false });
      return { success: true, message: res.data.message };
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to buy stock" });
      return { success: false };
    }
  },

  // ------------------- CLEAR ERROR -------------------
  clearError: () => set({ error: null }),
}));

export default useFundsStore;
