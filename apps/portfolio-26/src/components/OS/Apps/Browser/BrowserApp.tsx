import { useState } from "react";

export function BrowserApp() {
  const urlHook = useState<string>("https://souravrax.com");
  const inputHook = useState<string>("https://souravrax.com");

  const handleNavigate = (e: any) => {
    e.preventDefault();
    let targetUrl = inputHook[0];
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }
    urlHook[1](targetUrl);
    inputHook[1](targetUrl);
  };

  const handleInput = (e: any) => {
    inputHook[1](e.target.value);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--os-surface)] overflow-hidden">
      <div className="h-10 bg-[var(--os-surface)] border-b border-[var(--os-border)]/10 flex items-center px-2 gap-2">
        <div className="flex gap-1.5 mr-2">
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--os-border)]/5 text-[var(--os-text)]/50">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--os-border)]/5 text-[var(--os-text)]/50">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleNavigate}
          className="flex-1 flex items-center bg-[var(--os-surface)] border border-[var(--os-border)]/10 rounded-md px-2 h-7"
        >
          <div className="mr-2 text-[var(--os-text)]/40">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3 h-3"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <input
            type="text"
            value={inputHook[0]}
            onChange={handleInput}
            className="flex-1 bg-transparent text-[11px] text-[var(--os-text)] outline-none font-mono"
            spellCheck={false}
          />
        </form>

        <button
          onClick={handleNavigate}
          className="w-8 h-7 flex items-center justify-center rounded hover:bg-[var(--os-border)]/5 text-[var(--os-text)]/50"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
          >
            <path d="M23 4v6h-6" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        </button>
      </div>

      <div className="flex-1 relative bg-[var(--os-surface)]">
        <iframe
          src={urlHook[0]}
          className="w-full h-full border-none bg-[var(--os-surface)]"
          title="Browser Viewport"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />

        {urlHook[0].includes("google.com") && (
          <div className="absolute inset-0 bg-[var(--os-surface)] flex items-center justify-center p-8 text-center">
            <div className="max-w-xs">
              <p className="text-xs text-[var(--os-text)]/50 mb-4">
                Note: Sites like Google often block framing for security reasons
                (X-Frame-Options). Try a developer-friendly site like{" "}
                <b>astro.build</b> or <b>tailwindcss.com</b>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}