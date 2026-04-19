import { useState, useEffect } from "react";
import { useKernelStore } from "@/system/KernelStore";
import { useVFS } from "@/system/FileSystemStore";
import { useSettings } from "@/system/SettingsStore";

import { Window } from "./Window";
import { Terminal } from "../Apps/Terminal/Terminal";
import { BrowserApp } from "../Apps/Browser/BrowserApp";
import { TaskManager } from "../Apps/TaskManager";
import { MenuBar } from "../Shell/MenuBar";
import { Dock } from "../Shell/Dock";
import { ContextMenu } from "../Shell/ContextMenu";
import { SettingsApp } from "../Apps/Settings";

export function OSController() {
  const windows = useKernelStore((state) => state.windows);
  const kernelLoaded = useKernelStore((state) => state.isLoaded);
  const openApp = useKernelStore((state) => state.openApp);

  const vfs = useVFS((state) => state.vfs);
  const vfsLoaded = useVFS((state) => state.isLoaded);

  const theme = useSettings((state) => state.theme);
  const wallpaperIndex = useSettings((state) => state.wallpaperIndex);
  const settingsLoaded = useSettings((state) => state.isLoaded);

  const contextMenuHook = useState<{ visible: boolean; x: number; y: number }>({
    visible: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    contextMenuHook[1]({ visible: true, x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    if (contextMenuHook[0].visible) {
      contextMenuHook[1]({ ...contextMenuHook[0], visible: false });
    }
  };

  const isLoaded = kernelLoaded && vfsLoaded && settingsLoaded;

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-[var(--os-titlebar-bg)] flex items-center justify-center text-[var(--os-titlebar-text)] font-mono">
        Booting Sourav OS...
      </div>
    );
  }

  const wallpapers = ["wallpaper-1.jpg", "wallpaper-2.png"];

  const APP_REGISTRY: Record<string, React.ComponentType<any>> = {
    terminal: Terminal,
    browser: BrowserApp,
    taskmanager: TaskManager,
    settings: SettingsApp,
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${wallpapers[wallpaperIndex]})` }}
      >
        <div className="absolute inset-0 bg-[var(--os-titlebar-bg)]/10"></div>
      </div>

      <MenuBar />

      {windows.map((win) => {
        const AppComponent = APP_REGISTRY[win.type];
        return (
          <Window key={win.id} window={win}>
            {AppComponent ? <AppComponent /> : <div>Unknown Application</div>}
          </Window>
        );
      })}

      <Dock />

      {contextMenuHook[0].visible && (
        <ContextMenu
          x={contextMenuHook[0].x}
          y={contextMenuHook[0].y}
          onClose={() =>
            contextMenuHook[1]({ ...contextMenuHook[0], visible: false })
          }
        />
      )}
    </div>
  );
}
