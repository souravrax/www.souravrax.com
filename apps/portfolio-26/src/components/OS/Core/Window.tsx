import { useRef } from 'react';
import { useKernel, type OSWindow } from './Kernel';

interface WindowProps {
    window: OSWindow;
    children: any;
}

export function Window(props: WindowProps) {
    const focusWindow = useKernel(state => state.focusWindow);
    const closeWindow = useKernel(state => state.closeWindow);
    const updateWindowPos = useKernel(state => state.updateWindowPos);
    const updateWindowSize = useKernel(state => state.updateWindowSize);

    const draggingRef = useRef<{ startX: number; startY: number; windowX: number; windowY: number } | null>(null);
    const resizingRef = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null);

    const handleMouseDown = (e: any) => {
        focusWindow(props.window.id);
        const target = e.target as HTMLElement;

        if (target.closest('.window-resizer')) {
            e.preventDefault();
            resizingRef.current = {
                startX: e.clientX,
                startY: e.clientY,
                startW: props.window.w,
                startH: props.window.h
            };
            window.addEventListener('mousemove', handleResizeMouseMove);
            window.addEventListener('mouseup', handleResizeMouseUp);
            return;
        }

        if (target.closest('.window-title-bar') && !target.closest('.window-controls')) {
            draggingRef.current = {
                startX: e.clientX,
                startY: e.clientY,
                windowX: props.window.x,
                windowY: props.window.y
            };
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (draggingRef.current) {
            const dx = e.clientX - draggingRef.current.startX;
            const dy = e.clientY - draggingRef.current.startY;
            updateWindowPos(props.window.id, draggingRef.current.windowX + dx, draggingRef.current.windowY + dy);
        }
    };

    const handleMouseUp = () => {
        draggingRef.current = null;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const handleResizeMouseMove = (e: MouseEvent) => {
        if (resizingRef.current) {
            const dx = e.clientX - resizingRef.current.startX;
            const dy = e.clientY - resizingRef.current.startY;
            const newW = Math.max(resizingRef.current.startW + dx, 300);
            const newH = Math.max(resizingRef.current.startH + dy, 200);
            updateWindowSize(props.window.id, newW, newH);
        }
    };

    const handleResizeMouseUp = () => {
        resizingRef.current = null;
        window.removeEventListener('mousemove', handleResizeMouseMove);
        window.removeEventListener('mouseup', handleResizeMouseUp);
    };

    return (
        <div 
            className={`absolute flex flex-col stripe-glass rounded-lg border border-black/30 dark:border-white/10 shadow-2xl transition-[box-shadow] duration-200 ${props.window.z > 50 ? 'shadow-[var(--window-active-glow)]' : ''}`}
            style={{ 
                left: `${props.window.x}px`, 
                top: `${props.window.y}px`, 
                width: `${props.window.w}px`, 
                height: `${props.window.h}px`, 
                zIndex: props.window.z 
            }}
            onMouseDown={handleMouseDown}
        >
            <div className="window-title-bar h-8 w-full bg-slate-200/50 dark:bg-white/5 border-b border-black/10 dark:border-white/5 flex items-center px-3 cursor-default select-none relative flex-shrink-0">
                <div className="absolute inset-x-4 inset-y-2 opacity-20 pointer-events-none" style={{ background: 'var(--retro-stripes)' }}></div>
                
                <div className="window-controls flex gap-2 mr-4 z-10">
                    <button 
                        onClick={() => closeWindow(props.window.id)}
                        className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors border border-black/10"
                    ></button>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-black/10"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80 border border-black/10"></div>
                </div>

                <div className="flex-1 text-center text-xs font-bold tracking-wider text-slate-700 dark:text-slate-300 z-10 pointer-events-none">
                    {props.window.title}
                </div>
            </div>

            <div className="flex-1 overflow-hidden relative bg-black/10 dark:bg-black/40 backdrop-blur-xl">
                {props.children}
                
                <div className="window-resizer absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50 flex items-center justify-center group">
                    <div className="w-1.5 h-1.5 border-r-2 border-b-2 border-slate-400 dark:border-slate-600 opacity-40 group-hover:opacity-100 transition-opacity"></div>
                </div>
            </div>
        </div>
    );
}
