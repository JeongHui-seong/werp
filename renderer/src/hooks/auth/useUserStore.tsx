import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserState } from "../types/login/userState";

export const useUserStore = create(
    persist<UserState>((set) => ({
        user: null,
        setUser: (user) => set({user}),
        clearUser: () => set({ user:null })
    }), {
        name : "user-storage",
    }
)
)