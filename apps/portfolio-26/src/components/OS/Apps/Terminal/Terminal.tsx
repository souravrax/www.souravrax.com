import { useState, useRef, useEffect } from 'react';
import { useKernel } from '../../Core/Kernel';
import { SnakeGame } from './SnakeGame';

interface TypeHistory {
    type: 'command' | 'output' | 'error' | 'system' | 'link';
    content: string;
    url?: string;
}

export function Terminal() {
    const vfs = useKernel(state => state.vfs);
    const processes = useKernel(state => state.processes);
    const createNode = useKernel(state => state.createNode);
    const deleteNode = useKernel(state => state.deleteNode);

    const historyHook = useState<TypeHistory[]>([
        { type: 'system', content: 'Sourav OS Kernel v3.0.0 (Zustand)' },
        { type: 'system', content: 'VFS Mounted at /home/souravrax' }
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
            
            const updatedHistory = historyHook[0].concat({ type: 'command', content: `${getPathForNode(cwdHook[0])} > ${rawCmd}` });
            
            if (cmd === '') {
                historyHook[1](updatedHistory);
            } else if (cmd === 'ls') {
                const files = vfs.filter(n => n.parentId === cwdHook[0]);
                const output = files.map(f => `${f.type === 'dir' ? 'DIR ' : 'FILE'} ${f.name}`).join('\n');
                historyHook[1](updatedHistory.concat({ type: 'output', content: output || '(empty)' }));
            } else if (cmd === 'cd') {
                const targetPath = args[0] || '~';
                const node = findNodeByPath(targetPath);
                if (node && node.type === 'dir') {
                    cwdHook[1](node.id);
                    historyHook[1](updatedHistory);
                } else {
                    historyHook[1](updatedHistory.concat({ type: 'error', content: `cd: no such directory: ${targetPath}` }));
                }
            } else if (cmd === 'mkdir') {
                const name = args[0];
                if (name) {
                    createNode(name, 'dir', cwdHook[0]);
                    historyHook[1](updatedHistory);
                } else {
                    historyHook[1](updatedHistory.concat({ type: 'error', content: 'mkdir: missing operand' }));
                }
            } else if (cmd === 'touch') {
                const name = args[0];
                if (name) {
                    createNode(name, 'file', cwdHook[0], '');
                    historyHook[1](updatedHistory);
                } else {
                    historyHook[1](updatedHistory.concat({ type: 'error', content: 'touch: missing operand' }));
                }
            } else if (cmd === 'cat') {
                const name = args[0];
                const node = vfs.find(n => n.parentId === cwdHook[0] && n.name === name);
                if (node && node.type === 'file') {
                    historyHook[1](updatedHistory.concat({ type: 'output', content: node.content || '' }));
                } else {
                    historyHook[1](updatedHistory.concat({ type: 'error', content: `cat: ${name}: No such file` }));
                }
            } else if (cmd === 'rm') {
                const name = args[0];
                const node = vfs.find(n => n.parentId === cwdHook[0] && n.name === name);
                if (node) {
                    deleteNode(node.id);
                    historyHook[1](updatedHistory);
                } else {
                    historyHook[1](updatedHistory.concat({ type: 'error', content: `rm: cannot remove '${name}': No such file or directory` }));
                }
            } else if (cmd === 'ps') {
                const output = processes.map(p => `${p.pid}\t${p.name}\t${p.memory}MB\t${Math.floor((Date.now() - p.startTime)/1000)}s`).join('\n');
                historyHook[1](updatedHistory.concat({ type: 'output', content: `PID\tNAME\tMEM\tUPTIME\n${output}` }));
            } else if (cmd === 'help') {
                historyHook[1](updatedHistory.concat({
                    type: 'output',
                    content: 'Commands: ls, cd, pwd, mkdir, touch, cat, rm, ps, kill, clear, snake, help'
                }));
            } else if (cmd === 'pwd') {
                historyHook[1](updatedHistory.concat({ type: 'output', content: getPathForNode(cwdHook[0]) }));
            } else if (cmd === 'clear') {
                historyHook[1]([]);
            } else if (cmd === 'snake') {
                isSnakeHook[1](true);
                historyHook[1](updatedHistory.concat({ type: 'system', content: 'Starting snake module...' }));
            } else {
                historyHook[1](updatedHistory.concat({ type: 'error', content: `Command not found: ${cmd}` }));
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
            <div className="w-full h-full p-4 md:p-8 bg-transparent" onClick={handleFocus}>
                <SnakeGame onQuit={() => isSnakeHook[1](false)} />
            </div>
        );
    }

    return (
        <div 
            className="w-full h-full p-4 md:p-8 overflow-y-auto custom-scrollbar flex flex-col font-mono text-sm" 
            onClick={handleFocus}
            ref={containerRef}
            style={{ scrollBehavior: 'smooth' }}
        >
            <div className="flex-1 opacity-90">
                {historyHook[0].map((item, index) => {
                    const colorMap = {
                        command: 'text-cyan-400',
                        error: 'text-rose-400',
                        system: 'text-slate-500',
                        output: 'text-white/80',
                        link: 'text-indigo-400 underline'
                    };
                    return (
                        <div key={index} className={`${colorMap[item.type]} mb-1 whitespace-pre-wrap leading-relaxed`}>
                            {item.content}
                        </div>
                    );
                })}
                
                <div className="flex items-center text-cyan-400 mt-2">
                    <span className="mr-2">{getPathForNode(cwdHook[0])} &gt;</span>
                    <span className="relative flex-1">
                        {inputValueHook[0]}
                        <span className="inline-block w-2 h-4 bg-white/60 ml-1 animate-pulse align-middle"></span>
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
