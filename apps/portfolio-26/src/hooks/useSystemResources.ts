import { useState, useEffect } from 'react';

interface ResourceState {
    deviceMemory?: number;
    hardwareConcurrency: number;
    usage?: number;
    quota?: number;
}

export function useSystemResources() {
    const [resources, setResources] = useState<ResourceState>({
        hardwareConcurrency: typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : 4,
    });

    useEffect(() => {
        const updateResources = async () => {
            let storage = { usage: 0, quota: 0 };
            if (navigator.storage && navigator.storage.estimate) {
                const estimate = await navigator.storage.estimate();
                storage = {
                    usage: estimate.usage || 0,
                    quota: estimate.quota || 0
                };
            }

            setResources({
                deviceMemory: (navigator as any).deviceMemory,
                hardwareConcurrency: navigator.hardwareConcurrency,
                usage: storage.usage,
                quota: storage.quota
            });
        };

        updateResources();
        
        // Storage quota doesn't change frequently, but we can poll occasionally or just check on mount
        const interval = setInterval(updateResources, 60000); // Once per minute

        return () => clearInterval(interval);
    }, []);

    return resources;
}
