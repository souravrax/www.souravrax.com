import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import type { OSWindow, OSProcess, AppType } from './types';

interface KernelState {
    windows: OSWindow[];
    processes: OSProcess[];
    isLoaded: boolean;
    setLoaded: (loaded: boolean) => void;
    
    // Actions
    openApp: (type: AppType) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updateWindowPos: (id: string, x: number, y: number) => void;
    updateWindowSize: (id: string, w: number, h: number) => void;
}

const customStorage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => (await get(name)) || null,
    setItem: async (name: string, value: string): Promise<void> => { await set(name, value); },
    removeItem: async (name: string): Promise<void> => { await del(name); },
};

export const useKernelStore = create<KernelState>()(
    persist(
        (set, get) => ({
            windows: [],
            processes: [],
            isLoaded: false,

            setLoaded: (loaded) => set({ isLoaded: loaded }),

            openApp: (type) => {
                const pid = Date.now();
                const winId = `${type}-${pid}`;
                const windows = get().windows;
                
                const newProcess: OSProcess = {
                    pid,
                    name: type.charAt(0).toUpperCase() + type.slice(1),
                    type,
                    startTime: Date.now(),
                    memory: Math.floor(Math.random() * 50) + 10
                };

                const newWindow: OSWindow = {
                    id: winId,
                    pid,
                    type,
                    title: newProcess.name,
                    x: 100 + (windows.length * 30),
                    y: 100 + (windows.length * 30),
                    w: type === 'browser' ? 800 : 600,
                    h: type === 'browser' ? 600 : 400,
                    z: Math.max(...windows.map(w => w.z), 10) + 1,
                    isOpen: true,
                    isMinimized: false
                };

                set({
                    processes: [...get().processes, newProcess],
                    windows: [...windows, newWindow]
                });
            },

            closeWindow: (id) => {
                const win = get().windows.find(w => w.id === id);
                if (win) {
                    set({
                        windows: get().windows.filter(w => w.id !== id),
                        processes: get().processes.filter(p => p.pid !== win.pid)
                    });
                }
            },

            focusWindow: (id) => {
                const windows = get().windows;
                const maxZ = Math.max(...windows.map(w => w.z), 10);
                set({
                    windows: windows.map(w => 
                        w.id === id ? { ...w, z: maxZ + 1, isMinimized: false } : w
                    )
                });
            },

            updateWindowPos: (id, x, y) => {
                set({
                    windows: get().windows.map(w => 
                        w.id === id ? { ...w, x, y } : w
                    )
                });
            },

            updateWindowSize: (id, w, h) => {
                set({
                    windows: get().windows.map(win => 
                        win.id === id ? { ...win, w, h } : win
                    )
                });
            }
        }),
        {
            name: 'sourav-os-kernel',
            storage: createJSONStorage(() => customStorage),
            onRehydrateStorage: (state) => {
                return () => state?.setLoaded(true);
            }
        }
    )
);
