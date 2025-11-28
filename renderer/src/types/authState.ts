export interface AuthState {
    token: string;
    setToken: (token: string) => void;
    clearToken: () => void;
}