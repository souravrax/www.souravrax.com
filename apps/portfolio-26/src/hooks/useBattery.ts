import { useState, useEffect } from 'react';

interface BatteryManager {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
    addEventListener: (type: string, listener: EventListener) => void;
    removeEventListener: (type: string, listener: EventListener) => void;
}

export function useBattery() {
    const [battery, setBattery] = useState<{ level: number; charging: boolean }>({
        level: 1,
        charging: true
    });

    useEffect(() => {
        let batteryManager: BatteryManager | null = null;

        const updateBattery = () => {
            if (batteryManager) {
                setBattery({
                    level: batteryManager.level,
                    charging: batteryManager.charging
                });
            }
        };

        const getBattery = async () => {
            if ('getBattery' in navigator) {
                try {
                    batteryManager = await (navigator as any).getBattery();
                    if (batteryManager) {
                        updateBattery();
                        batteryManager.addEventListener('levelchange', updateBattery);
                        batteryManager.addEventListener('chargingchange', updateBattery);
                    }
                } catch (err) {
                    console.error('Battery API failed:', err);
                }
            }
        };

        getBattery();

        return () => {
            if (batteryManager) {
                batteryManager.removeEventListener('levelchange', updateBattery);
                batteryManager.removeEventListener('chargingchange', updateBattery);
            }
        };
    }, []);

    return battery;
}
