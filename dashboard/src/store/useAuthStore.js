// src/store/useAuthStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // ------------------- SIGNUP -------------------
  signup: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/signup`, data, { withCredentials: true }); // ✅ send cookies
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

  // ------------------- LOGIN -------------------
  login: async (form) => {
  set({ loading: true, error: null });
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", form, { withCredentials: true });
    set({ loading: false, isAuthenticated: true });
    return { success: true, user: res.data.user };
  } catch (err) {
    set({ loading: false, error: err.response?.data?.message || "Login failed" });
    return { success: false };
  }
},

  // ------------------- AUTO-LOGIN / CHECK SESSION -------------------
  autoLogin: async () => {
    try {
      const res = await axios.get(`${API_URL}/home`, { withCredentials: true }); // ✅ backend checks session
      if (res.data?.user) {
        set({ user: res.data.user, isAuthenticated: true });
        return { success: true };
      }
      return { success: false };
    } catch {
      return { success: false };
    }
  },

  // ------------------- LOGOUT -------------------
  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true }); // ✅ clears session
      set({ user: null, isAuthenticated: false });
    } catch (err) {
      console.error("Logout failed", err);
    }
  },

  // ------------------- CLEAR ERROR -------------------
  clearError: () => set({ error: null }),
}));

export default useAuthStore;