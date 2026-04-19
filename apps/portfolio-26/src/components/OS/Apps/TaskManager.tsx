import { useKernelStore } from "@/system/KernelStore";
import { useSystemResources } from "@/hooks/useSystemResources";

export function TaskManager() {
  const processes = useKernelStore(state => state.processes);
  const windows = useKernelStore(state => state.windows);
  const closeWindow = useKernelStore(state => state.closeWindow);
  
  const resources = useSystemResources();

  const handleKill = (pid: number) => {
    const target = windows.find(w => w.pid === pid);
    if (target) {
      closeWindow(target.id);
    }
  };

  return (
    <div className="h-full flex flex-col font-mono text-[10px] bg-[var(--os-surface)] text-[var(--os-text)] uppercase">
      <div className="p-3 border-b-4 border-[var(--os-border)] flex justify-between items-center bg-[var(--os-accent-primary)] text-[var(--os-text)]">
        <h2 className="font-black tracking-widest text-[11px]">
          [PROCESS_MONITOR]
        </h2>
        <div className="font-black border-2 border-[var(--os-border)] px-2 bg-[var(--os-surface)]">
          TASKS: {processes.length}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-1">
        <table className="w-full text-left border-2 border-[var(--os-border)] border-collapse">
          <thead className="bg-[var(--os-titlebar-bg)] text-[var(--os-titlebar-text)]">
            <tr>
              <th className="px-2 py-1 border-r-2 border-[var(--os-border)]">PROCESS</th>
              <th className="px-2 py-1 border-r-2 border-[var(--os-border)]">PID</th>
              <th className="px-2 py-1 border-r-2 border-[var(--os-border)]">RES_K</th>
              <th className="px-2 py-1 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((proc) => (
              <tr
                key={proc.pid}
                className="border-b-2 border-[var(--os-border)] hover:bg-[var(--os-accent-secondary)] hover:text-white transition-colors cursor-default font-black"
              >
                <td className="px-2 py-2 border-r-2 border-[var(--os-border)]">
                  {proc.name}
                </td>
                <td className="px-2 py-2 border-r-2 border-[var(--os-border)] opacity-70">{proc.pid}</td>
                <td className="px-2 py-2 border-r-2 border-[var(--os-border)]">
                  <div className="flex items-center gap-2">
                    <div className="w-14 h-3 border-2 border-[var(--os-border)] bg-[var(--os-surface)] overflow-hidden">
                      <div
                        className="h-full bg-[var(--os-titlebar-bg)]/80"
                        style={{ width: `${(proc.memory / 60) * 100}%` }}
                      ></div>
                    </div>
                    <span>{proc.memory}K</span>
                  </div>
                </td>
                <td className="px-2 py-2 text-right">
                  <button
                    onClick={() => handleKill(proc.pid)}
                    className="h-6 px-3 bg-[var(--os-accent-danger)] text-white border-2 border-[var(--os-border)] shadow-[3px_3px_0px_var(--os-shadow)] font-black active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-[9px]"
                  >
                    KILL
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-[var(--os-titlebar-bg)] text-[var(--os-titlebar-text)] grid grid-cols-4 gap-2 border-t-4 border-[var(--os-border)]">
         <Stat label="CPU_LOAD" value="4.2%" />
         <Stat label="RAM_PHYS" value={`${resources.deviceMemory || '?' }G`} />
         <Stat label="CORES" value={String(resources.hardwareConcurrency)} />
         <Stat label="UP" value={`${Math.floor(performance.now() / 1000)}S`} />
      </div>
    </div>
  );
}

function Stat(props: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[7px] font-black opacity-60 leading-none mb-1">
        {props.label}
      </span>
      <span className="text-[10px] font-black text-[var(--os-accent-primary)]">
        {props.value}
      </span>
    </div>
  );
}