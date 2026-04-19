import { useKernel } from "../Core/Kernel";

export function TaskManager() {
  const processes = useKernel(state => state.processes);
  const windows = useKernel(state => state.windows);
  const closeWindow = useKernel(state => state.closeWindow);

  const handleKill = (pid: number) => {
    const target = windows.find(w => w.pid === pid);
    if (target) {
      closeWindow(target.id);
    }
  };

  return (
    <div className="h-full bg-[#f6f9fc] dark:bg-[#0A0A0B] flex flex-col font-inter">
      <div className="p-4 border-b border-black/10 dark:border-white/5 bg-slate-100/50 dark:bg-white/5 flex justify-between items-center">
        <h2 className="text-xs font-bold tracking-widest uppercase text-slate-500">
          Active Processes
        </h2>
        <div className="text-[10px] font-mono opacity-50">
          {processes.length} tasks running
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/5 dark:bg-white/5 text-slate-400 font-mono uppercase text-[9px]">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">PID</th>
              <th className="px-4 py-2">Memory</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((proc) => (
              <tr
                key={proc.pid}
                className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">
                  {proc.name}
                </td>
                <td className="px-4 py-3 font-mono opacity-50">{proc.pid}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500/50"
                        style={{ width: `${(proc.memory / 60) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-mono text-[10px]">{proc.memory}MB</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleKill(proc.pid)}
                    className="px-2 py-1 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded text-[10px] transition-all font-bold"
                  >
                    Kill
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-slate-100/50 dark:bg-white/5 border-t border-black/10 dark:border-white/5 flex justify-between items-center">
        <div className="flex gap-4">
          <Stat label="CPU" value="4.2%" />
          <Stat
            label="RAM"
            value={`${processes.reduce((a, b) => a + Number(b.memory), 0)}MB`}
          />
        </div>
        <div className="text-[9px] font-mono text-slate-400">
          System Uptime: {Math.floor(performance.now() / 1000)}s
        </div>
      </div>
    </div>
  );
}

function Stat(props: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] uppercase tracking-tighter text-slate-400">
        {props.label}
      </span>
      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
        {props.value}
      </span>
    </div>
  );
}
