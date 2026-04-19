import { Button } from "../Core/UI/Button";

interface LockScreenProps {
  onUnlock: () => void;
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/wallpaper-2.png)` }}
      >
        <div className="absolute inset-0 bg-[var(--os-titlebar-bg)]/40 backdrop-blur-md"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[var(--os-text)] tracking-widest mb-2">
            RaxOS
          </h1>
          <p className="text-sm font-mono text-[var(--os-text)]/60 tracking-widest">
            Session Locked
          </p>
        </div>

        <Button onClick={onUnlock} size="lg" className="text-sm px-12">
          UNLOCK
        </Button>
      </div>
    </div>
  );
}
