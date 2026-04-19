import { useState, useEffect } from 'react';

interface EnvironmentState {
    locale: string;
    timezone: string;
    platform: string;
    userAgent: string;
}

export function useEnvironment() {
    const [env, setEnv] = useState<EnvironmentState>({
        locale: typeof navigator !== 'undefined' ? navigator.language : 'en-US',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        platform: typeof navigator !== 'undefined' ? (navigator as any).userAgentData?.platform || navigator.platform : 'Unknown',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
    });

    useEffect(() => {
        // Platform and UserAgent are static once loaded
        // Timezone/Locale occasionally change if user travels, but we can stick to mount values or refresh
    }, []);

    return env;
}
