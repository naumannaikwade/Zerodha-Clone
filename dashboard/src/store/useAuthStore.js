// dashboard/src/store/useAuthStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  signup: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, data, { withCredentials: true });
      set({ user: res.data.user, isAuthenticated: true });
      return { success: true, user: res.data.user };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Signup failed";
      set({ error: errorMsg });
      return { success: false, error: errorMsg };
    } finally {
      set({ loading: false });
    }
  },

  login: async (form) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form, { withCredentials: true });
      set({ loading: false, user: res.data.user, isAuthenticated: true });
      return { success: true, user: res.data.user };
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Login failed" });
      return { success: false };
    }
  },

  autoLogin: async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/session`, { withCredentials: true });
      if (res.data?.user) {
        set({ user: res.data.user, isAuthenticated: true });
        return { success: true };
      }
      return { success: false };
    } catch {
      return { success: false };
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
      set({ user: null, isAuthenticated: false });
    } catch (err) {
      console.error("Logout failed", err);
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
