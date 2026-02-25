"use client";

import React from "react";
import { Download, Sun, Moon, Maximize } from "lucide-react";

interface ViewerControlsProps {
    isStudioLight: boolean;
    onToggleLight: () => void;
    onExport: () => void;
    onReset: () => void;
}

export function ViewerControls({
    isStudioLight,
    onToggleLight,
    onExport,
    onReset,
}: ViewerControlsProps) {
    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-700/50 shadow-2xl">
            <button
                onClick={onToggleLight}
                className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#0ea5e9] transition-colors"
                title="Toggle Lighting"
            >
                {isStudioLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <span className="text-[10px] uppercase font-medium tracking-wider">
                    {isStudioLight ? "Studio" : "Ambient"}
                </span>
            </button>

            <div className="w-[1px] h-8 bg-slate-700/50" />

            <button
                onClick={onReset}
                className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#0ea5e9] transition-colors"
                title="Reset View"
            >
                <Maximize className="w-5 h-5" />
                <span className="text-[10px] uppercase font-medium tracking-wider">
                    Reset
                </span>
            </button>

            <div className="w-[1px] h-8 bg-slate-700/50" />

            <button
                onClick={onExport}
                className="flex flex-col items-center gap-1 text-[#0ea5e9] hover:text-[#38bdf8] transition-colors"
                title="Download Model"
            >
                <Download className="w-5 h-5" />
                <span className="text-[10px] uppercase font-medium tracking-wider">
                    Export
                </span>
            </button>
        </div>
    );
}
