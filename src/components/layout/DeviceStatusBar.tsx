"use client";

import { useEffect, useState } from "react";
import { Wifi, Signal, Battery } from "lucide-react";

export function DeviceStatusBar() {
    const [time, setTime] = useState("09:41");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            setTime(`${hours}:${minutes}`);
        };
        
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="device-status-bar">
            <span>{time}</span>
            <div className="flex items-center gap-1.5">
                <Signal size={12} className="text-zinc-200" />
                <span className="text-[9px] font-bold tracking-tighter text-zinc-300">5G</span>
                <Wifi size={12} className="text-zinc-200" />
                <Battery size={14} className="text-zinc-200" />
            </div>
        </div>
    );
}
