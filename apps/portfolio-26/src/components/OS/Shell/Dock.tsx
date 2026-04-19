import { useKernelStore } from "@/system/KernelStore";
import { useSettings } from "@/system/SettingsStore";
import { Button } from "../Core/UI/Button";
import { Panel } from "../Core/UI/Primitives";
import {
  TerminalIcon,
  BrowserIcon,
  FolderIcon,
  SettingsIcon,
} from "../Shared/Icons";

export function Dock() {
  const openApp = useKernelStore((state) => state.openApp);
  const dockPosition = useSettings((state) => state.dockPosition);

  const getPositionClasses = () => {
    switch (dockPosition) {
        case 'left':
            return 'top-1/2 -translate-y-1/2 left-4 flex-col';
        case 'right':
            return 'top-1/2 -translate-y-1/2 right-4 flex-col';
        case 'bottom':
            return 'bottom-4 left-1/2 -translate-x-1/2 flex-row';
        default:
            return 'bottom-4 left-4 flex-row';
    }
  };

  return (
    <div className={`absolute z-[1000] flex transition-all duration-300 ${getPositionClasses()}`}>
      <Panel className={`flex ${dockPosition === 'bottom' ? 'flex-row' : 'flex-col'} gap-2 p-2 !shadow-[6px_6px_0px_var(--os-shadow)]`}>
        <DockIcon
          label="TERM"
          variant="secondary"
          onClick={() => openApp("terminal")}
          svg={<TerminalIcon />}
        />
        <DockIcon
          label="NET"
          className="bg-cyan-400"
          onClick={() => openApp("browser")}
          svg={<BrowserIcon />}
        />
        <DockIcon
          label="VFS"
          className="bg-white"
          onClick={() => openApp("files")}
          svg={<FolderIcon />}
        />
        <DockIcon
          label="CFG"
          variant="primary"
          onClick={() => openApp("settings")}
          svg={<SettingsIcon />}
        />
        <DockIcon
          label="TASK"
          variant="danger"
          onClick={() => openApp("taskmanager")}
          svg={<SettingsIcon />}
        />
      </Panel>
    </div>
  );
}

function DockIcon(props: {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  onClick: () => void;
  svg: any;
}) {
  return (
    <Button
      variant={props.variant || "primary"}
      size="icon"
      className={`group relative w-12 h-12 ${props.className || ''}`}
      onClick={props.onClick}
    >
      <div className="w-8 h-8 flex items-center justify-center text-black">
        {props.svg}
      </div>
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--os-border)] text-[var(--os-accent-primary)] text-[10px] font-black border-2 border-[var(--os-border)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[10000] uppercase italic">
        {props.label}
      </div>
    </Button>
  );
}