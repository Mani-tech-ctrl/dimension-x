"use client";

import React, { useState } from "react";
import { Dropzone } from "@/components/Dropzone";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { ModelViewer } from "@/components/ModelViewer";
import { ViewerControls } from "@/components/ViewerControls";
import { Box, ArrowLeft } from "lucide-react";

type AppState = "idle" | "generating" | "viewing";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [isStudioLight, setIsStudioLight] = useState(true);

  // Async UX Flow State
  const [loadingMessage, setLoadingMessage] = useState("");
  const [progress, setProgress] = useState(0);

  // STEP 3: Multi-stage "AI generation" UX pipeline
  const handleFileSelect = async (file: File) => {
    // 1. Immediately show the Loading Overlay
    setAppState("generating");

    // Convert the uploaded File into a local Blob URL early, but don't show it yet
    const localUrl = URL.createObjectURL(file);

    // 2. Simulate Stage 1: Removing background
    setLoadingMessage("Removing background...");
    setProgress(15);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 3. Simulate Stage 2: Classifying subject
    setLoadingMessage("Classifying subject...");
    setProgress(40);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 4. Simulate Stage 3: Generating geometry
    setLoadingMessage("Generating geometry...");
    setProgress(75);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 5. Simulate Stage 4: Applying textures
    setLoadingMessage("Applying textures...");
    setProgress(95);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 6. Complete and Transition
    setProgress(100);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Brief pause at 100%

    setModelUrl(localUrl);
    setAppState("viewing"); // Transition to ModelViewer
  };

  const handleToggleLight = () => {
    setIsStudioLight((prev) => !prev);
  };

  const handleExport = () => {
    if (!modelUrl) return;
    const link = document.createElement("a");
    link.href = modelUrl;
    link.download = "dimension_x_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    if (modelUrl) URL.revokeObjectURL(modelUrl);
    setModelUrl(null);
    setAppState("idle");
    setProgress(0); // Reset UX flow
  };

  return (
    <main className="h-screen w-screen bg-[#0f172a] text-slate-100 flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="w-full shrink-0 p-4 md:p-6 flex items-center justify-between z-40 bg-slate-900/50 backdrop-blur-md border-b border-slate-700/50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#0ea5e9]/20 rounded-lg text-[#0ea5e9]">
            <Box className="w-6 h-6" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-[#0ea5e9]">
            DIMENSION-X
          </h1>
        </div>

        {appState === "viewing" && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Upload
          </button>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full h-full relative z-10 flex flex-col items-center justify-center p-4 md:p-8">

        {appState === "idle" && (
          <div className="w-full max-w-4xl flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-6">
              Upload Image
            </h2>
            <Dropzone onFileSelect={handleFileSelect} disabled={appState !== "idle"} />
          </div>
        )}

        {appState === "generating" && (
          <LoadingOverlay statusMessage={loadingMessage} progress={progress} />
        )}

        {appState === "viewing" && modelUrl && (
          <div className="w-full h-full max-w-6xl relative rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
            <ModelViewer imageUrl={modelUrl} isStudioLight={isStudioLight} />

            <ViewerControls
              isStudioLight={isStudioLight}
              onToggleLight={handleToggleLight}
              onExport={handleExport}
              onReset={handleReset}
            />
          </div>
        )}

      </div>

      {/* Background glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0ea5e9]/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-slate-800/80 blur-[130px] pointer-events-none z-0" />
    </main>
  );
}