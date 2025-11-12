// src/store/useAuthStore.js
import { create } from "zustand";
import axios from "axios";
import API_BASE_URL from '../config/api';

const API_URL = `${API_BASE_URL}/api/auth`;

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // ------------------- SIGNUP -------------------
  signup: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/signup`, data, { withCredentials: true });
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
      const res = await axios.post(`${API_URL}/login`, form, { 
        withCredentials: true 
      });
      set({ user: res.data.user, isAuthenticated: true, loading: false });
      return { success: true, user: res.data.user };
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Login failed" });
      return { success: false };
    }
  },

  // ------------------- AUTO-LOGIN / CHECK SESSION -------------------
  autoLogin: async () => {
    try {
      const res = await axios.get(`${API_URL}/home`, { withCredentials: true });
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
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      set({ user: null, isAuthenticated: false });
    } catch (err) {
      console.error("Logout failed", err);
    }
  },

  // ------------------- CLEAR ERROR -------------------
  clearError: () => set({ error: null }),
}));

export default useAuthStore;