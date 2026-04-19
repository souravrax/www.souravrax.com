import { useState, useEffect } from 'react';
import { useKernel } from '../Core/Kernel';
import { BatteryIcon, SignalIcon } from '../Shared/Icons';

export function MenuBar() {
    const vfs = useKernel(state => state.vfs);
    const [battery, setBattery] = useState<number>(85);
    
    const vfsSize = vfs.reduce((acc, node) => acc + (node.metadata.size || 0), 0);
    
    // Simulate battery drain
    useEffect(() => {
        const interval = setInterval(() => {
            setBattery((prev) => (prev > 5 ? prev - 1 : 100));
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-7 glass-panel border-b border-black/10 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-md flex items-center px-4 justify-between z-[1001]">
            <div className="flex items-center gap-4 text-xs font-bold text-slate-800 dark:text-slate-200">
                <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-default"> Sourav</span>
                <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-default">File</span>
                <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-default">Edit</span>
                <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-default">View</span>
            </div>
            
            <div className="flex items-center gap-4 text-[10px] font-mono text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-1 opacity-70">
                    <div className="w-3 h-3 text-slate-500"><SignalIcon /></div>
                    <span>Sourav-5G</span>
                </div>
                
                <div className="flex items-center gap-1 opacity-70">
                    <div className="w-4 h-4 text-slate-500"><BatteryIcon /></div>
                    <span>{battery}%</span>
                </div>

                <div className="flex items-center gap-1 opacity-70 border-r border-black/10 dark:border-white/10 pr-4 mr-2">
                    <span>DSK {Math.round(vfsSize / 1024)}KB</span>
                </div>

                <span className="font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        </div>
    );
}
