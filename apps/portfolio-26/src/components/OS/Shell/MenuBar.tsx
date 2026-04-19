import { useState } from "react";
import { useVFS } from "@/system/FileSystemStore";
import { useBattery } from "@/hooks/useBattery";
import { useNetwork } from "@/hooks/useNetwork";
import { BatteryIcon, SignalIcon } from "../Shared/Icons";
import { Panel } from "../Core/UI/Primitives";
import { StartButton } from "./StartButton";

export function MenuBar() {
  const vfs = useVFS((state) => state.vfs);
  const batteryState = useBattery();
  const networkState = useNetwork();

  const vfsSize = vfs.reduce((acc, node) => acc + (node.metadata.size || 0), 0);

  return (
    <div className="absolute top-0 left-0 w-full h-10 bg-[var(--os-surface)] border-b-4 border-[var(--os-border)] flex items-center px-2 justify-between z-[1001]">
      <div className="flex items-center gap-2 text-xs font-black">
        <StartButton />
        <div className="flex items-center gap-3 ml-2 uppercase text-[10px] font-black">
          <button className="hover:underline cursor-default">File</button>
          <button className="hover:underline cursor-default">Edit</button>
          <button className="hover:underline cursor-default">View</button>
        </div>
      </div>

      <div className="flex items-center gap-2 pr-2">
        <Panel size="sm" className="flex items-center gap-4 px-3 h-7 text-[9px] font-black uppercase">
          <div className="flex items-center gap-1">
            <div
              className={`w-3 h-3 ${networkState.isOnline ? "text-blue-500" : "text-rose-500 animate-pulse"}`}
            >
              <SignalIcon />
            </div>
            <span className="hidden sm:inline">
              {networkState.isOnline
                ? networkState.effectiveType?.toUpperCase() || "WIFI"
                : "OFFLINE"}
            </span>
          </div>

          <div className="flex items-center gap-1 border-l-2 border-[var(--os-border)] pl-3">
            <div
              className={`w-3 h-3 ${batteryState.charging ? "text-green-500" : "text-slate-500"}`}
            >
              <BatteryIcon />
            </div>
            <span>{Math.round(batteryState.level * 100)}%</span>
          </div>

          <div className="hidden md:flex items-center gap-1 border-l-2 border-[var(--os-border)] pl-3">
            <span>DSK {Math.round(vfsSize / 1024)}K</span>
          </div>

          <div className="border-l-2 border-[var(--os-border)] pl-3 font-black">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}