import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "../types/authState";

// create 함수를 사용하여 스토어 생성
// persist 미들웨어를 사용하여 로컬 스토리지 스토어 데이터 지속성 설정
export const useAuthStore = create(
    persist<AuthState>((set) => ({
        token: "",
        setToken: (token: string) => set({ token }),
        clearToken: () => set({ token: "" }),
    }), {
        name: "auth-storage",
    })
);


