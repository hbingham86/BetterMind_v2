import { create } from 'zustand';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatStore {
    messages: Message[];
    quickReplies: string[];
    threadId: string | null;
    setMessages: (messages: Message[]) => void;
    addMessage: (message: Message) => void;
    clearChat: () => void;
    setQuickReplies: (quickReplies: string[]) => void;
    setThreadId: (threadId: string | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    quickReplies: ['I feel stuck', "I don't feel like myself anymore", 'What made you smile?'],
    threadId: null,
    setMessages: (messages) => set({ messages }),
    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),
    clearChat: () =>
        set({
            messages: [],
            quickReplies: ['I feel stuck', "I don't feel like myself anymore", 'What made you smile?'],
            threadId: null,
        }),
    setQuickReplies: (quickReplies) => set({ quickReplies }),
    setThreadId: (threadId) => set({ threadId }),
}));
