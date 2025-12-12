interface user{
    email: string;
    name: string;
    department: string;
    role: string;
}

export interface UserState{
    user: user | null;
    setUser: (user: user) => void;
    clearUser: () => void;
}