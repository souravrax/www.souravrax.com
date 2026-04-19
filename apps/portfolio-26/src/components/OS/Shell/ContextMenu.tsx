import { useKernelStore } from '@/system/KernelStore';
import { useSettings } from '@/system/SettingsStore';
import { Panel } from '../Core/UI/Primitives';

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
}

export function ContextMenu(props: ContextMenuProps) {
    const openApp = useKernelStore(state => state.openApp);
    const wallpaperIndex = useSettings(state => state.wallpaperIndex);
    const setWallpaper = useSettings(state => state.setWallpaper);

    const handleChangeWallpaper = () => {
        const nextIndex = (wallpaperIndex + 1) % 6;
        setWallpaper(nextIndex);
        props.onClose();
    };

    const handleOpenTerminal = () => {
        openApp('terminal');
        props.onClose();
    };

    return (
        <Panel 
            size="sm"
            className="absolute z-[2000] w-52 py-1 font-mono uppercase"
            style={{ left: `${props.x}px`, top: `${props.y}px` }}
        >
            <ContextItem label="CYCLE_BACKDROP" onClick={handleChangeWallpaper} />
            <ContextItem label="SPAWN_TERMINAL" onClick={handleOpenTerminal} />
            <div className="h-1 bg-[var(--os-border)] my-1 mx-1"></div>
            <ContextItem label="CONFIG_SYSTEM" onClick={() => { openApp('settings'); props.onClose(); }} />
        </Panel>
    );
}

function ContextItem(props: { label: string; onClick: () => void }) {
    return (
        <div 
            className="px-4 py-2 text-[10px] font-black text-[var(--os-text)] hover:bg-[var(--os-accent-secondary)] hover:text-white cursor-default transition-all active:translate-x-1 active:translate-y-1"
            onClick={props.onClick}
        >
            {props.label}
        </div>
    );
}