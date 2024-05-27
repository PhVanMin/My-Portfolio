import { create } from 'zustand'

export const useStore = create((set) => ({
    isMusicPlaying: false,
    playMusic: () => set({ isMusicPlaying: true }),
    pauseMusic: () => set({ isMusicPlaying: false }),
}))