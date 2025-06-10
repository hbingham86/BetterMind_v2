import { create } from 'zustand';

interface ChatStore {
    userMessages: string[];
    botMessages: string[];
    setUserMessages: (newMessages: string[]) => void;
    setBotMessages: (newMessages: string[]) => void;
}

export const useChatHistoryStore = create<ChatStore>((set) => ({
    userMessages: [],
    botMessages: [],
    setUserMessages: (newMessages) => set({ userMessages: newMessages }),
    setBotMessages: (newMessages) => set({ botMessages: newMessages }),
}));
