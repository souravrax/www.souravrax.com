import { useKernel } from '../Core/Kernel';
import { TerminalIcon, BrowserIcon, FolderIcon, SettingsIcon } from '../Shared/Icons';

export function Dock() {
    const openApp = useKernel(state => state.openApp);

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
            <div className="flex items-end gap-3 px-4 py-3 stripe-glass rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl">
                <DockIcon label="Terminal" onClick={() => openApp('terminal')} svg={<TerminalIcon />} />
                <DockIcon label="Browser" onClick={() => openApp('browser')} svg={<BrowserIcon />} />
                <DockIcon label="Files" onClick={() => openApp('files' as any)} svg={<FolderIcon />} />
                <DockIcon label="Processes" onClick={() => openApp('taskmanager')} svg={<SettingsIcon />} />
            </div>
        </div>
    );
}

function DockIcon(props: { label: string; onClick: () => void; svg: any }) {
    return (
        <div 
            className="group relative w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 hover:scale-125 hover:-translate-y-2 transition-all cursor-default"
            onClick={props.onClick}
        >
            <div className="w-10 h-10 flex items-center justify-center text-slate-800 dark:text-white">
                {props.svg}
            </div>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {props.label}
            </div>
        </div>
    );
}
