import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import type { OSTheme } from './types';

interface SettingsState {
    theme: OSTheme;
    wallpaperIndex: number;
    dockPosition: 'left' | 'bottom' | 'right';
    isLoaded: boolean;
    setLoaded: (loaded: boolean) => void;
    setTheme: (theme: OSTheme) => void;
    setWallpaper: (index: number) => void;
    setDockPosition: (pos: 'left' | 'bottom' | 'right') => void;
}

const customStorage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => (await get(name)) || null,
    setItem: async (name: string, value: string): Promise<void> => { await set(name, value); },
    removeItem: async (name: string): Promise<void> => { await del(name); },
};

export const useSettings = create<SettingsState>()(
    persist(
        (set) => ({
            theme: 'dark',
            wallpaperIndex: 0,
            dockPosition: 'left',
            isLoaded: false,

            setLoaded: (loaded) => set({ isLoaded: loaded }),
            setTheme: (theme) => set({ theme }),
            setWallpaper: (wallpaperIndex) => set({ wallpaperIndex }),
            setDockPosition: (dockPosition) => set({ dockPosition })
        }),
        {
            name: 'sourav-os-settings',
            storage: createJSONStorage(() => customStorage),
            onRehydrateStorage: (state) => {
                return () => state?.setLoaded(true);
            }
        }
    )
);
