"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoadingOverlayProps {
    statusMessage?: string;
    progress?: number;
}

export function LoadingOverlay({
    statusMessage = "Applying AI magic...",
    progress = 0
}: LoadingOverlayProps) {
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-md">
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Outer glowing ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-t-[1.5px] border-[#0ea5e9] opacity-70"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
                {/* Inner reverse ring */}
                <motion.div
                    className="absolute inset-2 rounded-full border border-b-[2px] border-[#38bdf8] opacity-50"
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
                {/* Center pulsing core */}
                <motion.div
                    className="w-12 h-12 bg-[#0ea5e9]/20 rounded-full shadow-[0_0_20px_#0ea5e9]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
            </div>

            <motion.div
                className="mt-8 text-center flex flex-col items-center w-full max-w-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="text-xl font-medium text-slate-100 mb-2">
                    Generating Mesh
                </h3>

                {/* Progress Bar Container */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3 mt-2">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                </div>

                <p className="text-sm text-[#0ea5e9] animate-pulse">
                    {statusMessage}
                </p>
            </motion.div>
        </div>
    );
}
