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

export type AppType = 'terminal' | 'browser' | 'explorer' | 'taskmanager' | 'settings' | 'files';

export interface OSProcess {
    pid: number;
    name: string;
    type: AppType;
    startTime: number;
    memory: number;
}

export interface OSWindow {
    id: string;
    pid: number;
    type: AppType;
    title: string;
    x: number;
    y: number;
    w: number;
    h: number;
    z: number;
    isOpen: boolean;
    isMinimized: boolean;
}

export type OSTheme = 'light' | 'dark';
