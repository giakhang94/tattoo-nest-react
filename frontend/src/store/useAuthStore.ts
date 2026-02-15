import { create } from "zustand";

interface AuthStore {
  userToken: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  userToken: null,
  setToken: (token) => set({ userToken: token }),
  logout: () => set({ userToken: null }),
}));
