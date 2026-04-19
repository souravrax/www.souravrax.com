import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import type { VFSNode } from './types';

const DEFAULT_VFS: VFSNode[] = [
    { id: 'root', name: '/', type: 'dir', parentId: null, metadata: { size: 0, created: Date.now(), modified: Date.now() } },
    { id: 'home', name: 'home', type: 'dir', parentId: 'root', metadata: { size: 0, created: Date.now(), modified: Date.now() } },
    { id: 'souravrax', name: 'souravrax', type: 'dir', parentId: 'home', metadata: { size: 0, created: Date.now(), modified: Date.now() } },
    { id: 'readme', name: 'README.md', type: 'file', parentId: 'souravrax', content: '# Welcome to Sourav OS\nThis is a concrete web operating system with a persistent VFS.', metadata: { size: 120, created: Date.now(), modified: Date.now() } }
];

interface FileSystemState {
    vfs: VFSNode[];
    isLoaded: boolean;
    setLoaded: (loaded: boolean) => void;
    createNode: (name: string, type: 'file' | 'dir', parentId: string, content?: string) => VFSNode;
    deleteNode: (id: string) => void;
}

const customStorage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => (await get(name)) || null,
    setItem: async (name: string, value: string): Promise<void> => { await set(name, value); },
    removeItem: async (name: string): Promise<void> => { await del(name); },
};

export const useVFS = create<FileSystemState>()(
    persist(
        (set, get) => ({
            vfs: DEFAULT_VFS,
            isLoaded: false,

            setLoaded: (loaded) => set({ isLoaded: loaded }),

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
            name: 'sourav-os-vfs',
            storage: createJSONStorage(() => customStorage),
            onRehydrateStorage: (state) => {
                return () => state?.setLoaded(true);
            }
        }
    )
);
