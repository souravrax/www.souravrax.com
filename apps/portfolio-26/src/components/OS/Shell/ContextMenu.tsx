import { useKernel } from '../Core/Kernel';

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
}

export function ContextMenu(props: ContextMenuProps) {
    const openApp = useKernel(state => state.openApp);
    const wallpaperIndex = useKernel(state => state.wallpaperIndex);
    const setWallpaper = useKernel(state => state.setWallpaper);

    const handleChangeWallpaper = () => {
        setWallpaper(wallpaperIndex === 0 ? 1 : 0);
        props.onClose();
    };

    const handleOpenTerminal = () => {
        openApp('terminal');
        props.onClose();
    };

    return (
        <div 
            className="absolute z-[2000] w-48 stripe-glass rounded-lg border border-black/20 dark:border-white/10 py-1 shadow-2xl animate-in fade-in zoom-in duration-150"
            style={{ left: `${props.x}px`, top: `${props.y}px` }}
        >
            <ContextItem label="Change Wallpaper" onClick={handleChangeWallpaper} />
            <ContextItem label="Open Terminal" onClick={handleOpenTerminal} />
            <hr className="my-1 border-black/10 dark:border-white/5" />
            <ContextItem label="System Preferences" onClick={() => {}} />
        </div>
    );
}

function ContextItem(props: { label: string; onClick: () => void }) {
    return (
        <div 
            className="px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 hover:bg-[#635BFF] hover:text-white cursor-default transition-colors"
            onClick={props.onClick}
        >
            {props.label}
        </div>
    );
}
