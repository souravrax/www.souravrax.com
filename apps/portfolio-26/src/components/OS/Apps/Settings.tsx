import { useState } from "react";
import { useSettings } from "@/system/SettingsStore";
import { useVFS } from "@/system/FileSystemStore";
import { useSystemResources } from "@/hooks/useSystemResources";
import { useEnvironment } from "@/hooks/useEnvironment";

type TabID = "SYSTEM" | "DISPLAY" | "STORAGE" | "ABOUT";

export function SettingsApp() {
  const theme = useSettings((state) => state.theme);
  const setTheme = useSettings((state) => state.setTheme);
  const wallpaperIndex = useSettings((state) => state.wallpaperIndex);
  const setWallpaper = useSettings((state) => state.setWallpaper);
  const dockPosition = useSettings((state) => state.dockPosition);
  const setDockPosition = useSettings((state) => state.setDockPosition);

  const vfs = useVFS((state) => state.vfs);
  const vfsSize = vfs.reduce((acc, node) => acc + (node.metadata.size || 0), 0);

  const resources = useSystemResources();
  const env = useEnvironment();

  const [activeTab, setActiveTab] = useState<TabID>("SYSTEM");

  const wallpapers = [
    { name: "FREE_WILL.JPG", url: "/wallpaper-1.jpg" },
    { name: "NEO_LAND.WIDE", url: "/wallpaper-2.png" },
  ];

  return (
    <div className="h-full bg-[var(--os-surface)] dark:bg-[var(--os-surface)] flex font-mono text-[var(--os-text)] p-2 uppercase overflow-hidden">
      <div className="w-40 flex flex-col gap-3 pr-2">
        <TabButton
          label="SYSTEM"
          active={activeTab === "SYSTEM"}
          onClick={() => setActiveTab("SYSTEM")}
        />
        <TabButton
          label="DISPLAY"
          active={activeTab === "DISPLAY"}
          onClick={() => setActiveTab("DISPLAY")}
        />
        <TabButton
          label="STORAGE"
          active={activeTab === "STORAGE"}
          onClick={() => setActiveTab("STORAGE")}
        />
        <TabButton
          label="ABOUT"
          active={activeTab === "ABOUT"}
          onClick={() => setActiveTab("ABOUT")}
        />

        <div className="mt-auto bg-[var(--os-accent-secondary)] border-[3px] border-[var(--os-border)] shadow-[3px_3px_0px_var(--os-shadow)] text-white p-3">
          <div className="text-[10px] font-black">STORAGE_OK</div>
          <div className="text-[8px] opacity-80 mt-1">
            {Math.round(vfsSize / 1024)}KB USED
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[var(--os-surface)] border-[3px] border-[var(--os-border)] shadow-[6px_6px_0px_var(--os-shadow)] p-6 overflow-auto">
        <h1 className="text-xl font-black mb-10 tracking-tighter border-b-4 border-[var(--os-border)] pb-2">
          / {activeTab}_CONFIG
        </h1>

        {activeTab === "SYSTEM" && (
          <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xs font-black mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-[var(--os-border)]"></span>
              CORE_PREFERENCES
            </h2>

            <div className="mb-8">
              <div className="text-[10px] font-black mb-2 opacity-50">
                DOCK_POSITION
              </div>
              <div className="flex gap-2">
                {["left", "bottom", "right"].map((pos: any) => (
                  <button
                    key={pos}
                    onClick={() => setDockPosition(pos)}
                    className={`flex-1 h-10 bg-[var(--os-surface)] border-[3px] border-[var(--os-border)] shadow-[3px_3px_0px_var(--os-shadow)] text-[10px] font-black uppercase ${dockPosition === pos ? "bg-[var(--os-accent-primary)]" : ""}`}
                  >
                    {pos.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="text-[10px] font-black mb-2 opacity-50">
                APPEARANCE_SCHEME
              </div>
              <div className="flex gap-6">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex-1 p-4 bg-[var(--os-surface)] border-[3px] border-[var(--os-border)] shadow-[4px_4px_0px_var(--os-shadow)] ${theme === "light" ? "bg-[var(--os-accent-primary)]" : ""}`}
                >
                  <div className="h-8 w-full bg-[var(--os-surface)] border-2 border-[var(--os-border)] mb-3"></div>
                  <div className="text-xs font-black">STARK_LIGHT</div>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex-1 p-4 bg-[var(--os-surface)] border-[3px] border-[var(--os-border)] shadow-[4px_4px_0px_var(--os-shadow)] ${theme === "dark" ? "bg-[var(--os-accent-secondary)] text-white" : ""}`}
                >
                  <div className="h-8 w-full bg-[var(--os-bg)] border-2 border-[var(--os-border)] mb-3"></div>
                  <div className="text-xs font-black">SOLID_DARK</div>
                </button>
              </div>
            </div>
          </section>
        )}

        {activeTab === "DISPLAY" && (
          <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xs font-black mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-[var(--os-border)]"></span>
              BACKDROP_RESOURCE
            </h2>
            <div className="grid grid-cols-2 gap-6 pb-6">
              {wallpapers.map((wp, idx) => (
                <button
                  key={idx}
                  onClick={() => setWallpaper(idx)}
                  className={`bg-[var(--os-surface)] border-[3px] border-[var(--os-border)] shadow-[3px_3px_0px_var(--os-shadow)] p-1 transition-all ${wallpaperIndex === idx ? "bg-[var(--os-accent-secondary)] scale-105" : ""}`}
                >
                  <div className="aspect-video relative overflow-hidden border-2 border-[var(--os-border)]">
                    <img
                      src={wp.url}
                      alt={wp.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[10px] font-black p-2 bg-[var(--os-titlebar-bg)] text-[var(--os-accent-primary)] mt-1">
                    {wp.name}
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {activeTab === "STORAGE" && (
          <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xs font-black mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-[var(--os-border)]"></span>
              VOLUME_METRICS
            </h2>
            <div className="bg-[var(--os-accent-primary)]/10 border-[3px] border-[var(--os-border)] shadow-[3px_3px_0px_var(--os-shadow)] p-4">
              <div className="flex justify-between text-[10px] font-black mb-2">
                <span>SECTOR_01 / VFS</span>
                <span>
                  {Math.round(
                    resources.usage ? resources.usage / (1024 * 1024) : 0,
                  )}{" "}
                  MB /{" "}
                  {Math.round(
                    resources.quota ? resources.quota / (1024 * 1024) : 0,
                  )}{" "}
                  MB
                </span>
              </div>
              <div className="w-full h-6 border-4 border-[var(--os-border)] bg-[var(--os-surface)] overflow-hidden p-1">
                <div
                  className="h-full bg-[var(--os-accent-secondary)]"
                  style={{
                    width: `${resources.usage && resources.quota ? (resources.usage / resources.quota) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <div className="text-[9px] mt-4 opacity-70">
                The filesystem partition is allocated within the browser origin
                storage quota.
              </div>
            </div>
          </section>
        )}

        {activeTab === "ABOUT" && (
          <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xs font-black mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-[var(--os-border)]"></span>
              HARDWARE_PROFILE
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HardwareCard
                label="CPU_LOGIC"
                value={`${resources.hardwareConcurrency} CORES`}
              />
              <HardwareCard
                label="RAM_PHYS"
                value={`${resources.deviceMemory || "?"} GB`}
              />
              <HardwareCard label="PLATFORM" value={env.platform} />
              <HardwareCard
                label="STORAGE_MAX"
                value={`${Math.round(resources.quota ? resources.quota / (1024 * 1024 * 1024) : 0)} GB`}
              />
            </div>

            <div className="mt-8 p-4 bg-[var(--os-titlebar-bg)] text-[var(--os-accent-primary)] border-[3px] border-[var(--os-border)] shadow-[4px_4px_0px_var(--os-accent-primary)] text-[9px] font-black break-all">
              {env.userAgent}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function TabButton(props: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={props.onClick}
      className={`h-11 px-4 bg-[var(--os-surface)] border-[3px] border-[var(--os-border)] shadow-[3px_3px_0px_var(--os-shadow)] text-left text-xs font-black uppercase ${props.active ? "bg-[var(--os-accent-secondary)] text-white shadow-none translate-x-1 translate-y-1" : ""}`}
    >
      {props.label}
    </button>
  );
}

function HardwareCard(props: { label: string; value: string }) {
  return (
    <div className="p-4 bg-[var(--os-surface)] border-[3px] border-[var(--os-border)] shadow-[3px_3px_0px_var(--os-shadow)] text-[var(--os-text)]">
      <div className="text-[9px] font-black opacity-50 mb-1">{props.label}</div>
      <div className="text-xs font-black">{props.value}</div>
    </div>
  );
}
