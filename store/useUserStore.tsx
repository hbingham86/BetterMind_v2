import { create } from 'zustand';

interface EmergencyContact {
    createdAt: string;
    id: number;
    phone: string;
    updatedAt: string;
}

interface User {
    AiName: string;
    createdAt: string;
    customerId: string;
    dob: string;
    email: string;
    emergencyContacts: EmergencyContact[];
    fullName: string;
    id: number;
    avatar?: string;
    isActive: boolean;
    isOAuthUser: boolean;
    isPremium: boolean;
    isVerified: boolean;
    mood: any;
    phoneNumber: string;
    refreshToken: string;
    role: string;
    updatedAt: string;
}

interface UserState {
    user: User | null;
    mood: string | null;
    AiName: string | null;
    avatar: string | null;
    setUser: (user: User) => void;
    setMood: (mood: string) => void;
    updateUser: (updates: Partial<User>) => void;
    clearUser: () => void;
    setAvatar: (avatar: string) => void;

    setAiName: (aiName: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    mood: null,
    AiName: null,
    avatar: null,

    setUser: (user) => set({ user }),
    setMood: (mood) => set({ mood }),
    setAiName: (aiName) => set({ AiName: aiName }),
    setAvatar: (avatar) => set({ avatar }),
    updateUser: (updates) =>
        set((state) => {
            if (!state.user) return {};
            const newUser = { ...state.user, ...updates };
            return { user: newUser };
        }),

    clearUser: () => set({ user: null, mood: null, AiName: null }),
}));
