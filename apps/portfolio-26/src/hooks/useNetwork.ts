import { useState, useEffect } from 'react';

interface NetworkState {
    isOnline: boolean;
    effectiveType?: string;
    downlink?: number;
    saveData?: boolean;
}

export function useNetwork() {
    const [network, setNetwork] = useState<NetworkState>({
        isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    });

    useEffect(() => {
        const handleStatus = () => {
            const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
            setNetwork({
                isOnline: navigator.onLine,
                effectiveType: connection?.effectiveType,
                downlink: connection?.downlink,
                saveData: connection?.saveData
            });
        };

        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        
        window.addEventListener('online', handleStatus);
        window.addEventListener('offline', handleStatus);
        
        if (connection) {
            connection.addEventListener('change', handleStatus);
        }

        handleStatus();

        return () => {
            window.removeEventListener('online', handleStatus);
            window.removeEventListener('offline', handleStatus);
            if (connection) {
                connection.removeEventListener('change', handleStatus);
            }
        };
    }, []);

    return network;
}
