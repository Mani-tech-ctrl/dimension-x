"use client";

import React, { useCallback, useState } from "react";
import { UploadCloud } from "lucide-react";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function Dropzone({ onFileSelect, disabled = false }: DropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      setError(null);

      if (disabled) return;

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        validateAndProcessFile(file);
      }
    },
    [disabled, onFileSelect]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setError(null);

      if (disabled) return;

      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        validateAndProcessFile(file);
      }
    },
    [disabled, onFileSelect]
  );

  const validateAndProcessFile = (file: File) => {
    // Only allow PNG and JPG
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid PNG or JPG image.");
      return;
    }
    onFileSelect(file);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-4">
      <div
        className={`relative w-full aspect-video rounded-2xl glass-panel border-2 border-dashed flex flex-col items-center justify-center p-8 text-center transition-all duration-300 overflow-hidden group hover:border-[#0ea5e9] hover:bg-slate-800/80 ${
          isDragActive
            ? "border-[#0ea5e9] bg-slate-800/80 scale-[1.02] shadow-[0_0_30px_rgba(14,165,233,0.3)]"
            : "border-slate-600 bg-slate-900/50"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          onChange={handleChange}
          accept="image/jpeg,image/png"
          disabled={disabled}
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-4 rounded-full bg-slate-800 transition-colors duration-300 group-hover:bg-[#0ea5e9]/20 group-hover:text-[#0ea5e9] ${isDragActive ? "bg-[#0ea5e9]/20 text-[#0ea5e9]" : "text-slate-400"}`}>
            <UploadCloud className="w-10 h-10" />
          </div>
          <div>
            <p className="text-lg font-medium text-slate-200">
              Drag & Drop your image here
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Supports: JPG, PNG (Max 10MB)
            </p>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 text-red-400 text-sm font-medium">
          {error}
        </div>
      )}
    </div>
  );
}
