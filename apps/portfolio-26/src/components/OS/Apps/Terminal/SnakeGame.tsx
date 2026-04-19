import { useEffect, useRef, useState } from 'react';

interface Point {
    x: number;
    y: number;
}

interface GameState {
    snake: Point[];
    food: Point;
    dir: Point;
    gameOver: boolean;
    score: number;
}

const GRID_SIZE = 20;

export function SnakeGame(props: { onQuit: () => void }) {
    const renderHook = useState<number>(0);
    
    const stateRef = useRef<GameState>({
        snake: [{ x: 10, y: 10 }],
        food: { x: 15, y: 5 },
        dir: { x: 1, y: 0 },
        gameOver: false,
        score: 0
    });
    
    // Using a ref for the direction to ensure the event listener doesn't mutate state asynchronously
    // before the tick processes
    const pendingDirRef = useRef<Point>({ x: 1, y: 0 });

    useEffect(() => {
        let frameId: number;
        let lastTime: number = performance.now();
        const tickRate = 120; // Move every 120ms
        
        const generateFood = (currentSnake: Point[]): Point => {
            let newFood: Point = { x: 0, y: 0 };
            let isOccupied = true;
            while (isOccupied) {
                newFood.x = Math.floor(Math.random() * GRID_SIZE);
                newFood.y = Math.floor(Math.random() * GRID_SIZE);
                let hit = false;
                for (let i = 0; i < currentSnake.length; i++) {
                    if (currentSnake[i].x === newFood.x && currentSnake[i].y === newFood.y) {
                        hit = true;
                        break;
                    }
                }
                isOccupied = hit;
            }
            return newFood;
        };

        const tick = (time: number) => {
            if (stateRef.current.gameOver) {
                return;
            }

            if (time - lastTime > tickRate) {
                lastTime = time;
                
                const currentState = stateRef.current;
                const head = currentState.snake[0];
                
                const currentDir = pendingDirRef.current;
                currentState.dir = currentDir;
                
                const newHead = {
                    x: head.x + currentDir.x,
                    y: head.y + currentDir.y
                };
                
                // Collision with walls
                if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
                    currentState.gameOver = true;
                    renderHook[1](renderHook[0] + 1);
                    return;
                }
                
                // Collision with self
                for (let i = 0; i < currentState.snake.length; i++) {
                    if (currentState.snake[i].x === newHead.x && currentState.snake[i].y === newHead.y) {
                        currentState.gameOver = true;
                        renderHook[1](renderHook[0] + 1);
                        return;
                    }
                }
                
                const newSnake = [newHead].concat(currentState.snake);
                
                if (newHead.x === currentState.food.x && newHead.y === currentState.food.y) {
                    currentState.score += 10;
                    currentState.food = generateFood(newSnake);
                } else {
                    newSnake.pop();
                }
                
                currentState.snake = newSnake;
                // Force a re-render
                renderHook[1](time);
            }
            
            frameId = requestAnimationFrame(tick);
        };
        
        frameId = requestAnimationFrame(tick);
        
        const handleKeyDown = (e: KeyboardEvent) => {
            const curDir = stateRef.current.dir;
            if (e.key === 'ArrowUp' || e.key === 'w') {
                if (curDir.y !== 1) pendingDirRef.current = { x: 0, y: -1 };
            } else if (e.key === 'ArrowDown' || e.key === 's') {
                if (curDir.y !== -1) pendingDirRef.current = { x: 0, y: 1 };
            } else if (e.key === 'ArrowLeft' || e.key === 'a') {
                if (curDir.x !== 1) pendingDirRef.current = { x: -1, y: 0 };
            } else if (e.key === 'ArrowRight' || e.key === 'd') {
                if (curDir.x !== -1) pendingDirRef.current = { x: 1, y: 0 };
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const currentState = stateRef.current;
    
    // Build the grid strings
    let gridStrings = [];
    for (let y = 0; y < GRID_SIZE; y++) {
        let rowStr = '';
        for (let x = 0; x < GRID_SIZE; x++) {
            let ch = '·';
            if (currentState.food.x === x && currentState.food.y === y) {
                ch = '★';
            } else {
                for (let i = 0; i < currentState.snake.length; i++) {
                    if (currentState.snake[i].x === x && currentState.snake[i].y === y) {
                        ch = i === 0 ? '▣' : '■';
                        break;
                    }
                }
            }
            rowStr += ch + ' ';
        }
        gridStrings.push(rowStr);
    }
    
    return (
        <div className="h-full flex flex-col justify-center items-center text-[#8792A2] font-['Geist_Mono'] select-none">
            <div className="mb-4 text-[#00D4FF] text-xl font-bold flex justify-between w-full max-w-[400px]">
                <span>SNAKE</span>
                <span>SCORE: {currentState.score}</span>
            </div>
            
            <div className="bg-black/30 p-4 border border-[#FFFFFF]/10 rounded-lg shadow-[0_0_15px_rgba(0,212,255,0.1)]">
                {gridStrings.map((row, idx) => (
                    <div key={idx} className="tracking-widest whitespace-pre h-6 flex items-center">
                        {row.split('').map((char, cidx) => {
                            if (char === '★') return <span key={cidx} className="text-[#00D4FF]">{char}</span>;
                            if (char === '▣' || char === '■') return <span key={cidx} className="text-[#635BFF]">{char}</span>;
                            return <span key={cidx} className="opacity-30">{char}</span>;
                        })}
                    </div>
                ))}
            </div>
            
            {currentState.gameOver && (
                <div className="mt-6 text-center text-red-400 font-bold animate-pulse">
                    <div>GAME OVER</div>
                    <div className="text-sm mt-2 text-[#8792A2] cursor-pointer hover:text-white" onClick={() => {
                        stateRef.current = {
                            snake: [{ x: 10, y: 10 }],
                            food: { x: 15, y: 5 },
                            dir: { x: 1, y: 0 },
                            gameOver: false,
                            score: 0
                        };
                        pendingDirRef.current = { x: 1, y: 0 };
                        renderHook[1](Math.random());
                    }}>
                        Press here to Restart
                    </div>
                </div>
            )}
            
            <div 
                className="mt-8 text-sm cursor-pointer hover:text-white border border-[#8792A2]/30 px-4 py-2 rounded transition-colors duration-200"
                onClick={props.onQuit}
            >
                [ Quit Module ]
            </div>
        </div>
    );
}
