import { create } from 'zustand';

interface Chat {
    id: number;
    name: string;
    isChatEnded: boolean;
    threadId: string;
}

interface getChatStore {
    page: number;
    allChats: Chat[];
    isFetchingMore: boolean;
    isMenuOpen: boolean;
    setPage: (page: number) => void;
    setAllChats: (chats: Chat[]) => void;
    appendChats: (chats: Chat[]) => void;
    setIsFetchingMore: (isFetching: boolean) => void;
}

const getAllChatsStore = create<getChatStore>((set) => ({
    page: 1,
    allChats: [],
    isFetchingMore: false,
    isMenuOpen: false,
    setPage: (page) => set({ page }),
    setAllChats: (chats) => set({ allChats: chats }),
    appendChats: (chats) =>
        set((state) => {
            const existingIds = new Set(state.allChats.map((chat) => chat.id)); // Track existing IDs
            const newChats = chats.filter((chat) => !existingIds.has(chat.id)); // Filter out duplicates
            return { allChats: [...state.allChats, ...newChats] };
        }),
    setIsFetchingMore: (isFetching) => set({ isFetchingMore: isFetching }),
}));

export default getAllChatsStore;
