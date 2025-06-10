import { Journal } from '@/api/Journals/types';
import { create } from 'zustand';

interface JournalStore {
    search: string;
    setSearch: (search: string) => void;
    mood: string;
    setMood: (mood: string) => void;
    page: number;
    setPage: (page: number) => void;
    limit: number;
    journals: Journal[];
    addJournal: (journal: Journal) => void;
    deleteJournal: (id: number) => void;
    updateJournal: (updatedJournal: Journal) => void;
    setJournals: (journals: Journal[]) => void;
    clearStore?: any;
}

export const useJournalStore = create<JournalStore>((set) => ({
    search: '',
    setSearch: (search) => set({ search }),

    mood: '',
    setMood: (mood) => set({ mood }),

    page: 1,
    setPage: (page) => set({ page }),

    limit: 8,

    journals: [],
    addJournal: (journal) => set((state) => ({ journals: [...state.journals, journal] })),
    deleteJournal: (id) =>
        set((state) => ({
            journals: state.journals.filter((journal) => journal.id !== id),
        })),
    updateJournal: (updatedJournal) =>
        set((state) => ({
            journals: state.journals.map((journal) => (journal.id === updatedJournal.id ? updatedJournal : journal)),
        })),
    setJournals: (journals) => set({ journals }),
    clearStore: () =>
        set({
            search: '',
            mood: '',
            page: 1,
            journals: [],
        }),
}));
