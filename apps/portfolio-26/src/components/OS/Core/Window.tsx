import { useRef } from 'react';
import { useKernelStore } from '@/system/KernelStore';
import type { OSWindow } from '@/system/types';
import { Panel, TitleBar } from './UI/Primitives';

interface WindowProps {
    window: OSWindow;
    children: any;
}

export function Window(props: WindowProps) {
    const focusWindow = useKernelStore(state => state.focusWindow);
    const closeWindow = useKernelStore(state => state.closeWindow);
    const updateWindowPos = useKernelStore(state => state.updateWindowPos);
    const updateWindowSize = useKernelStore(state => state.updateWindowSize);

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
        <Panel 
            className="absolute flex flex-col select-none transition-shadow duration-100 overflow-hidden"
            style={{ 
                left: `${props.window.x}px`, 
                top: `${props.window.y}px`, 
                width: `${props.window.w}px`, 
                height: `${props.window.h}px`, 
                zIndex: props.window.z 
            }}
            onMouseDown={handleMouseDown}
        >
            <TitleBar 
                className="window-title-bar"
                title={props.window.title}
                active={props.window.z > 50}
                onClose={() => closeWindow(props.window.id)}
                onMinimize={() => {}}
            />

            <div className={`flex-1 overflow-hidden relative ${props.window.z > 50 ? 'bg-[var(--os-surface)]' : 'bg-[var(--os-surface)]/50'}`}>
                {props.children}
                
                <div className="window-resizer absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-50 flex items-end justify-end p-1">
                    <div className="w-3 h-3 border-r-2 border-b-2 border-[var(--os-border)] opacity-50"></div>
                </div>
            </div>
        </Panel>
    );
}