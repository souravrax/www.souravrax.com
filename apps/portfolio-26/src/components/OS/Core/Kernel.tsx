import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';

export interface VFSNode {
    id: string;
    name: string;
    type: 'file' | 'dir';
    parentId: string | null;
    content?: string;
    metadata: {
        size: number;
        created: number;
        modified: number;
    };
}

export interface OSProcess {
    pid: number;
    name: string;
    type: 'terminal' | 'browser' | 'explorer' | 'taskmanager';
    startTime: number;
    memory: number; // Mock
}

export interface OSWindow {
    id: string;
    pid: number;
    type: OSProcess['type'];
    title: string;
    x: number;
    y: number;
    w: number;
    h: number;
    z: number;
    isOpen: boolean;
    isMinimized: boolean;
}

const DEFAULT_VFS: VFSNode[] = [
    { id: 'root', name: '/', type: 'dir', parentId: null, metadata: { size: 0, created: Date.now(), modified: Date.now() } },
    { id: 'home', name: 'home', type: 'dir', parentId: 'root', metadata: { size: 0, created: Date.now(), modified: Date.now() } },
    { id: 'souravrax', name: 'souravrax', type: 'dir', parentId: 'home', metadata: { size: 0, created: Date.now(), modified: Date.now() } },
    { id: 'readme', name: 'README.md', type: 'file', parentId: 'souravrax', content: '# Welcome to Sourav OS\nThis is a concrete web operating system with a persistent VFS.', metadata: { size: 120, created: Date.now(), modified: Date.now() } }
];

interface OSState {
    windows: OSWindow[];
    processes: OSProcess[];
    vfs: VFSNode[];
    wallpaperIndex: number;
    isLoaded: boolean;
    
    // Actions
    openApp: (type: OSProcess['type']) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updateWindowPos: (id: string, x: number, y: number) => void;
    updateWindowSize: (id: string, w: number, h: number) => void;
    setWallpaper: (index: number) => void;
    
    // VFS Actions
    createNode: (name: string, type: 'file' | 'dir', parentId: string, content?: string) => VFSNode;
    deleteNode: (id: string) => void;
    setLoaded: (loaded: boolean) => void;
}

const customStorage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        return (await get(name)) || null;
    },
    setItem: async (name: string, value: string): Promise<void> => {
        await set(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
        await del(name);
    },
};

export const useKernel = create<OSState>()(
    persist(
        (set, get) => ({
            windows: [],
            processes: [],
            vfs: DEFAULT_VFS,
            wallpaperIndex: 0,
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
            },

            setWallpaper: (index) => set({ wallpaperIndex: index }),

            createNode: (name, type, parentId, content) => {
                const newNode: VFSNode = {
                    id: Date.now().toString(),
                    name,
                    type,
                    parentId,
                    content,
                    metadata: { size: content?.length || 0, created: Date.now(), modified: Date.now() }
                };
                set({ vfs: [...get().vfs, newNode] });
                return newNode;
            },

            deleteNode: (id) => {
                if (id === 'root' || id === 'home' || id === 'souravrax') return;
                set({ vfs: get().vfs.filter(n => n.id !== id) });
            }
        }),
        {
            name: 'sourav-os-state',
            storage: createJSONStorage(() => customStorage),
            onRehydrateStorage: (state) => {
                return () => state?.setLoaded(true);
            }
        }
    )
);
