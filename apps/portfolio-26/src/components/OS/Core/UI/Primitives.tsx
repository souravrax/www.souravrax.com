import React from "react";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md";
}

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className = "", size = "md", ...props }, ref) => {
    return (
      <div
        className={`bg-os-surface border-neo ${size === "sm" ? "shadow-neo-sm" : "shadow-neo"} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Panel.displayName = "Panel";

interface TitleBarProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    onClose?: () => void;
    onMinimize?: () => void;
    active?: boolean;
}

export const TitleBar = React.forwardRef<HTMLDivElement, TitleBarProps>(
    ({ className = "", title, onClose, onMinimize, active = true, ...props }, ref) => {
        return (
            <div 
                className={`flex items-center h-8 px-2 cursor-default select-none pointer-events-auto border-b-neo ${active ? 'bg-black text-white' : 'bg-slate-400 text-black'} ${className}`}
                ref={ref}
                {...props}
            >
                <div className="flex-1 text-[10px] font-black uppercase tracking-widest pl-1 truncate">
                    {title}
                </div>
                
                <div className="flex gap-2 items-center">
                    {onMinimize && (
                        <button 
                            onClick={onMinimize}
                            className="w-4 h-4 rounded-none border border-black bg-white hover:bg-slate-100 flex items-center justify-center text-[8px] font-black"
                        >
                            /
                        </button>
                    )}
                    {onClose && (
                        <button 
                            onClick={onClose}
                            className="w-4 h-4 rounded-none border border-black bg-neo-red text-white hover:opacity-80 flex items-center justify-center text-[10px] pb-0.5"
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>
        );
    }
);

TitleBar.displayName = "TitleBar";
