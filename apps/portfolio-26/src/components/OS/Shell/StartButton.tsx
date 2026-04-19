import { useState } from "react";
import { useKernelStore } from "@/system/KernelStore";
import { Panel } from "../Core/UI/Primitives";
import { TerminalIcon, BrowserIcon, SettingsIcon, FolderIcon, CalculatorIcon, MusicIcon, ImageIcon, MailIcon, VideoIcon, GamepadIcon } from "../Shared/Icons";

const FAKE_APPS = [
  { id: "terminal", name: "TERMINAL", icon: TerminalIcon, description: "Command Line Interface" },
  { id: "browser", name: "BROWSER", icon: BrowserIcon, description: "Web Navigator" },
  { id: "files", name: "FILES", icon: FolderIcon, description: "File Explorer" },
  { id: "settings", name: "SETTINGS", icon: SettingsIcon, description: "System Configuration" },
  { id: "calculator", name: "CALC", icon: CalculatorIcon, description: "Calculator App" },
  { id: "music", name: "MUSIC", icon: MusicIcon, description: "Audio Player" },
  { id: "photos", name: "PHOTOS", icon: ImageIcon, description: "Image Gallery" },
  { id: "mail", name: "MAIL", icon: MailIcon, description: "Email Client" },
  { id: "video", name: "VIDEO", icon: VideoIcon, description: "Media Player" },
  { id: "game", name: "GAMES", icon: GamepadIcon, description: "Arcade Collection" },
];

export function StartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const openApp = useKernelStore((state) => state.openApp);

  const handleOpenApp = (appId: string) => {
    openApp(appId);
    setIsOpen(false);
  };

  const getIconBg = (index: number) => {
    const colors = [
      "bg-[var(--os-accent-secondary)]",
      "bg-[var(--os-accent-primary)]",
      "bg-cyan-400",
      "bg-pink-400",
      "bg-green-400",
      "bg-orange-400",
      "bg-purple-400",
      "bg-red-400",
      "bg-teal-400",
      "bg-indigo-400",
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-7 px-3 bg-[var(--os-accent-primary)] border-2 border-[var(--os-border)] shadow-[2px_2px_0px_var(--os-shadow)] text-[10px] font-black uppercase active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
      >
        START
      </button>

      {isOpen && (
        <div className="absolute top-12 left-2 z-[2000]" onClick={(e) => e.stopPropagation()}>
          <Panel className="w-80 p-0 overflow-hidden">
            <div className="p-2 bg-[var(--os-titlebar-bg)] text-[var(--os-accent-primary)] text-[10px] font-black border-b-2 border-[var(--os-border)] uppercase tracking-widest">
              / APP_DIRECTORY
            </div>
            <div className="grid grid-cols-5 gap-2 p-3">
              {FAKE_APPS.map((app, index) => (
                <button
                  key={app.id}
                  onClick={() => handleOpenApp(app.id)}
                  className="flex flex-col items-center gap-1 p-2 hover:bg-[var(--os-accent-primary)] transition-colors group"
                >
                  <div className={`w-10 h-10 flex items-center justify-center border-2 border-[var(--os-border)] ${getIconBg(index)}`}>
                    <app.icon />
                  </div>
                  <span className="text-[8px] font-black uppercase text-center leading-tight group-hover:text-[var(--os-titlebar-bg)]">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[1999]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}