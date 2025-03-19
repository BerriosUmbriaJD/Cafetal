import { create } from "zustand";
import { User } from "@/types";
import { db } from "@/db/db";


interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: async (email: string, password: string) => {
    const database = db.getDB();
    const user = database.users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) throw new Error("Credenciales incorrectas");

    localStorage.setItem("currentUserId", user.id);

    set({ user });
  },

  logout: () => {
    localStorage.removeItem("currentUserId");
    set({ user: null });
  },
}));