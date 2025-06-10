import { create } from 'zustand';

interface OnBoard {
    botResponse: string[];
    setBotResponse: (response: string[]) => void;
    feeling: string | null;
    setFeeling: (feeling: string) => void;
}

export const useOnboardingStore = create<OnBoard>((set) => ({
    botResponse: [],
    setBotResponse: (response) => set({ botResponse: response }),
    feeling: null,
    setFeeling: (feeling) => set({ feeling }),
}));
