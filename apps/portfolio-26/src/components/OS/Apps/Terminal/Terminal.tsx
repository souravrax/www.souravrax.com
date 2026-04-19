import { useState, useRef, useEffect } from 'react';
import { useKernelStore } from '@/system/KernelStore';
import { useVFS } from '@/system/FileSystemStore';
import { SnakeGame } from './SnakeGame';

interface TypeHistory {
    type: 'command' | 'output' | 'error' | 'system' | 'link';
    content: string;
    url?: string;
}

export function Terminal() {
    const vfs = useVFS(state => state.vfs);
    
    const processes = useKernelStore(state => state.processes);

    const historyHook = useState<TypeHistory[]>([
        { type: 'system', content: '>>> BRUTALIST_KERNEL v6.0' },
        { type: 'system', content: '>>> [FILE_SYSTEM_ONLINE]' }
    ]);
    const inputValueHook = useState<string>('');
    const isSnakeHook = useState<boolean>(false);
    const cwdHook = useState<string>('souravrax'); 

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [historyHook[0]]);

    const handleFocus = () => {
        if (inputRef.current && !isSnakeHook[0]) {
            inputRef.current.focus();
        }
    };

    const getPathForNode = (nodeId: string): string => {
        const path: string[] = [];
        let current = vfs.find(n => n.id === nodeId);
        while (current) {
            path.unshift(current.name);
            current = vfs.find(n => n.id === current?.parentId);
        }
        return path.join('/').replace('//', '/');
    };

    const findNodeByPath = (path: string) => {
        if (path === '/') return vfs.find(n => n.id === 'root');
        if (path === '~') return vfs.find(n => n.id === 'souravrax');
        
        const parts = path.split('/').filter(p => p !== '');
        let current = vfs.find(n => n.id === cwdHook[0]);

        if (path.startsWith('/')) {
            current = vfs.find(n => n.id === 'root');
        }

        for (const part of parts) {
            if (part === '..') {
                current = vfs.find(n => n.id === current?.parentId);
            } else if (part === '.') {
                continue;
            } else {
                current = vfs.find(n => n.parentId === current?.id && n.name === part);
            }
            if (!current) return undefined;
        }
        return current;
    };

    const handleKeyDown = (event: any) => {
        if (isSnakeHook[0]) return;
        
        if (event.key === 'Enter') {
            const rawCmd = inputValueHook[0].trim();
            const parts = rawCmd.split(' ');
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);
            
            const updatedHistory = historyHook[0].concat({ type: 'command', content: `${getPathForNode(cwdHook[0])} $ ${rawCmd}` });
            
            if (cmd === '') {
                historyHook[1](updatedHistory);
            } else if (cmd === 'ls') {
                const files = vfs.filter(n => n.parentId === cwdHook[0]);
                const output = files.map(f => `[${f.type.toUpperCase()}] ${f.name}`).join('\n');
                historyHook[1](updatedHistory.concat({ type: 'output', content: output || '(EMPTY)' }));
            } else if (cmd === 'ps') {
                const output = processes.map(p => `${p.pid} | ${p.name.toUpperCase()} | ${p.memory}K`).join('\n');
                historyHook[1](updatedHistory.concat({ type: 'output', content: `PID | NAME | MEM\n${output}` }));
            } else if (cmd === 'help') {
                historyHook[1](updatedHistory.concat({
                    type: 'output',
                    content: 'CMDS: LS, CD, PWD, MKDIR, TOUCH, CAT, RM, PS, CLEAR, SNAKE, HELP'
                }));
            } else if (cmd === 'clear') {
                historyHook[1]([]);
            } else if (cmd === 'snake') {
                isSnakeHook[1](true);
            } else {
                historyHook[1](updatedHistory.concat({ type: 'error', content: `ERR: CMD_NOT_FOUND: ${cmd.toUpperCase()}` }));
            }
            inputValueHook[1]('');
        }
    };

    const handleInput = (event: any) => {
        const target = event.target as HTMLInputElement;
        inputValueHook[1](target.value);
    };

    if (isSnakeHook[0]) {
        return (
            <div className="w-full h-full p-4 bg-[var(--os-titlebar-bg)] border-4 border-[var(--os-border)]" onClick={handleFocus}>
                <SnakeGame onQuit={() => isSnakeHook[1](false)} />
            </div>
        );
    }

    return (
        <div 
            className="w-full h-full p-4 overflow-y-auto flex flex-col font-mono text-xs bg-[var(--os-surface)] text-[var(--os-text)]" 
            onClick={handleFocus}
            ref={containerRef}
        >
            <div className="flex-1">
                {historyHook[0].map((item, index) => {
                    const colorMap = {
                        command: 'text-[var(--os-text)] font-black',
                        error: 'bg-[var(--os-accent-danger)] text-white px-1',
                        system: 'text-[var(--os-text)]/40 italic',
                        output: 'text-[var(--os-text)] text-white/90',
                        link: 'text-[var(--os-accent-secondary)] underline'
                    };
                    return (
                        <div key={index} className={`${colorMap[item.type]} mb-1 whitespace-pre-wrap`}>
                            {item.content}
                        </div>
                    );
                })}
                
                <div className="flex items-center text-[var(--os-text)] mt-2 font-black">
                    <span className="mr-2 uppercase">{getPathForNode(cwdHook[0])} $</span>
                    <span className="relative flex-1">
                        {inputValueHook[0]}
                        <span className="inline-block w-2.5 h-4 bg-[var(--os-border)] ml-1 animate-pulse align-middle"></span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="opacity-0 absolute inset-0 w-full h-full cursor-text"
                            value={inputValueHook[0]}
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            autoComplete="off"
                            autoCapitalize="off"
                            spellCheck={false}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}