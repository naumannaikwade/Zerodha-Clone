import { create } from "zustand";
import api from "../api/client";

let initializationPromise = null;

const saveToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }
};

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  initialized: false,
  error: null,

  initialize: async () => {
    if (get().initialized) return;
    if (initializationPromise) return initializationPromise;

    initializationPromise = (async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        set({ loading: false, initialized: true });
        return;
      }

      try {
        const response = await api.get("/api/auth/verify");
        set({
          user: response.data.user,
          isAuthenticated: true,
          error: null,
        });
      } catch (error) {
        saveToken(null);
        set({ user: null, isAuthenticated: false });
      } finally {
        set({ loading: false, initialized: true });
        initializationPromise = null;
      }
    })();

    return initializationPromise;
  },

  signup: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/api/auth/signup", userData);
      const { user, token } = response.data;
      saveToken(token);
      localStorage.setItem("userId", user._id);
      set({ user, isAuthenticated: true, initialized: true });
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ loading: false });
    }
  },

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/api/auth/login", credentials);
      const { user, token } = response.data;
      saveToken(token);
      localStorage.setItem("userId", user._id);
      set({ user, isAuthenticated: true, initialized: true });
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    saveToken(null);
    set({ user: null, isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
