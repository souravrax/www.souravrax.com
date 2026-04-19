import { useState } from "react";
import { useKernel } from "./Kernel";
import { Window } from "./Window";
import { Terminal } from "../Apps/Terminal/Terminal";
import { BrowserApp } from "../Apps/Browser/BrowserApp";
import { TaskManager } from "../Apps/TaskManager";
import { MenuBar } from "../Shell/MenuBar";
import { Dock } from "../Shell/Dock";
import { ContextMenu } from "../Shell/ContextMenu";

export function OSController() {
  const windows = useKernel((state) => state.windows);
  const isLoaded = useKernel((state) => state.isLoaded);
  const wallpaperIndex = useKernel((state) => state.wallpaperIndex);
  const vfs = useKernel((state) => state.vfs);

  const contextMenuHook = useState<{ visible: boolean; x: number; y: number }>({
    visible: false,
    x: 0,
    y: 0,
  });

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    contextMenuHook[1]({ visible: true, x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    if (contextMenuHook[0].visible) {
      contextMenuHook[1]({ ...contextMenuHook[0], visible: false });
    }
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-white font-mono">
        Loading Sourav OS...
      </div>
    );
  }

  const wallpapers = [
    "/macos_dynamic_wallpaper_1_1776599668478.png",
    "/macos_dynamic_wallpaper_light_1776599687324.png",
  ];

  const vfsSize = vfs.reduce((acc, node) => acc + (node.metadata.size || 0), 0);

  const APP_REGISTRY: Record<string, React.ComponentType<any>> = {
    terminal: Terminal,
    browser: BrowserApp,
    taskmanager: TaskManager,
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      {/* Wallpaper Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${wallpapers[wallpaperIndex]})` }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
      </div>

      {/* Menu Bar */}
      <MenuBar />

      {/* Application Windows */}
      {windows.map((win) => {
        const AppComponent = APP_REGISTRY[win.type];
        return (
          <Window key={win.id} window={win}>
            {AppComponent ? <AppComponent /> : <div>Unknown Application</div>}
          </Window>
        );
      })}

      {/* Dock */}
      <Dock />

      {/* Context Menu */}
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
