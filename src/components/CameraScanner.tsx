import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  UploadCloud,
  Search,
  RefreshCw,
  Sparkles,
  AlertCircle,
  X,
  ScanLine
} from "lucide-react";
import { CAMPUS_PRESETS } from "../data/sampleItems";
import { PresetItem } from "../types";

interface CameraScannerProps {
  onAnalyze: (payload: { textQuery?: string; imageBase64?: string; mimeType?: string }) => void;
  isLoading: boolean;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState<"camera" | "upload" | "text">("upload");
  const [textInput, setTextInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("image/jpeg");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera stream cleanly
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Start camera
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn("Camera access failed:", err);
      setCameraError(
        "Camera access unavailable. You can upload an image file or test with preset campus waste samples below."
      );
      setCameraActive(false);
    }
  };

  useEffect(() => {
    if (activeTab === "camera") {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeTab]);

  // Capture frame from webcam
  const captureFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setSelectedImage(dataUrl);
    setMimeType("image/jpeg");
    stopCamera();
    setActiveTab("upload");
  };

  // Handle local file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setMimeType(file.type || "image/jpeg");
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setMimeType(file.type || "image/jpeg");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (preset: PresetItem) => {
    setTextInput(preset.name);
    setSelectedImage(preset.image);
    setMimeType("image/jpeg");
    onAnalyze({
      textQuery: preset.query,
      imageBase64: preset.image,
      mimeType: "image/jpeg",
    });
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedImage && !textInput.trim()) return;

    onAnalyze({
      textQuery: textInput.trim() || undefined,
      imageBase64: selectedImage || undefined,
      mimeType: selectedImage ? mimeType : undefined,
    });
  };

  const clearSelection = () => {
    setSelectedImage(null);
    setTextInput("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="ecosort-panel scanner-surface bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 transition-colors duration-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="ecosort-heading text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ScanLine className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            AI Waste Inspection & Multimodal Scanner
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Identify item type, composite layers, contamination hazards, and bin destination instantly.
          </p>
        </div>

        {/* Input Method Segmented Control */}
        <div className="inline-flex p-1 bg-slate-100/90 dark:bg-slate-800/90 rounded-xl text-xs font-medium self-start sm:self-auto transition-colors">
          <button
            id="tab-upload"
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === "upload"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </button>
          <button
            id="tab-camera"
            type="button"
            onClick={() => setActiveTab("camera")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === "camera"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Live Camera</span>
          </button>
          <button
            id="tab-text"
            type="button"
            onClick={() => setActiveTab("text")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === "text"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Text Query</span>
          </button>
        </div>
      </div>

      {/* Main Scanner Body */}
      <div className="mt-5">
        {/* TAB 1: UPLOAD PHOTO */}
        {activeTab === "upload" && (
          <div>
            {!selectedImage ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="scanner-dropzone group p-8 sm:p-10 text-center cursor-pointer transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:border-emerald-300 dark:group-hover:border-emerald-600 shadow-xs transition-all">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Click to browse or drop an image here
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Take or upload a photo of food packaging, dorm cafeteria trash, e-waste, or bottles.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-slate-200/60 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300">
                  PNG, JPG, WEBP up to 20MB
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 max-h-[360px] flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Waste item to inspect"
                  className="max-h-[340px] w-auto object-contain rounded-xl"
                />
                {/* Floating Clear Button */}
                <button
                  onClick={clearSelection}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
                {/* Scanning Radar Overlay if loading */}
                {isLoading && (
                  <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-2xs flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                    <p className="mt-4 text-sm font-semibold text-emerald-200 animate-pulse flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Auditing material layers with Gemini AI...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LIVE CAMERA */}
        {activeTab === "camera" && (
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 min-h-[300px] flex flex-col items-center justify-center">
            {cameraError ? (
              <div className="p-6 text-center max-w-md">
                <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-xs text-slate-300 mb-4">{cameraError}</p>
                <button
                  onClick={() => setActiveTab("upload")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  Switch to Photo Upload
                </button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-auto max-h-[360px] object-cover"
                />
                {/* Viewfinder crosshairs */}
                <div className="absolute inset-8 border border-white/20 rounded-xl pointer-events-none flex items-center justify-center">
                  <div className="w-8 h-8 border-t-2 border-l-2 border-emerald-400 absolute top-0 left-0" />
                  <div className="w-8 h-8 border-t-2 border-r-2 border-emerald-400 absolute top-0 right-0" />
                  <div className="w-8 h-8 border-b-2 border-l-2 border-emerald-400 absolute bottom-0 left-0" />
                  <div className="w-8 h-8 border-b-2 border-r-2 border-emerald-400 absolute bottom-0 right-0" />
                </div>

                {/* Shutter Button */}
                <div className="absolute bottom-4 inset-x-0 flex justify-center items-center gap-4">
                  <button
                    id="btn-capture-shutter"
                    onClick={captureFrame}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg transition-transform hover:scale-105 active:scale-95"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture Snapshot</span>
                  </button>
                  <button
                    onClick={startCamera}
                    className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white text-xs"
                    title="Reload Camera"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Optional Description / Text input attached to image */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              id="input-waste-query"
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="E.g., Cafeteria pizza box with grease, disposable coffee cup, or broken headphone cord..."
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-slate-50/50 dark:bg-slate-800/60 transition-colors"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(e);
              }}
            />
          </div>
          <button
            id="btn-analyze-waste"
            type="button"
            disabled={isLoading || (!selectedImage && !textInput.trim())}
            onClick={() => handleSubmit()}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs shadow-emerald-700/20 transition-all hover:scale-[1.01]"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Run AI Inspection</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Chips for Rapid 1-Click Evaluation */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            Quick Demo Scenarios (Campus Common Contaminants):
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline">
            Click any item to simulate instant scan
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CAMPUS_PRESETS.map((preset) => (
            <button
              key={preset.id}
              id={`preset-${preset.id}`}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs bg-slate-100/80 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-950 dark:hover:text-emerald-200 hover:border-emerald-200 dark:hover:border-emerald-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 transition-all"
            >
              <img
                src={preset.image}
                alt={preset.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="font-medium">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
