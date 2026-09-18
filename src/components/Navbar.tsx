import React from "react";
import { Recycle, Award, FileText, BrainCircuit, Globe, Sparkles, MapPin, Sun, Moon, MessageSquare } from "lucide-react";

interface NavbarProps {
  ecoPoints: number;
  divertedKg: number;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenPresentation: () => void;
  onOpenDeepThinking: () => void;
  onOpenDropOff: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  ecoPoints,
  divertedKg,
  theme,
  onToggleTheme,
  onOpenPresentation,
  onOpenDeepThinking,
  onOpenDropOff,
  onOpenChat,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-emerald-100 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & SDG Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
            <Recycle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight font-sans">
                EcoSort<span className="text-emerald-600 dark:text-emerald-400 font-extrabold">.AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                <Globe className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                SDG 12 Aligned
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block">
              1M1B & IBM SkillsBuild AI for Sustainability Prototype
            </p>
          </div>
        </div>

        {/* Action Controls & Metrics */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Eco Points Counter */}
          <div className="flex items-center gap-2 sm:gap-3 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs transition-colors">
            <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-semibold">
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{ecoPoints} pts</span>
            </div>
            <div className="w-px h-3 bg-emerald-200 dark:bg-emerald-800/80 hidden sm:block" />
            <div className="text-slate-600 dark:text-slate-400 hidden sm:block">
              <span className="font-medium text-slate-900 dark:text-slate-200">{divertedKg.toFixed(2)} kg</span> diverted
            </div>
          </div>

          {/* Gemini AI Chatbot Launcher */}
          <button
            id="btn-chatbot-nav"
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-teal-800 dark:text-teal-200 bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800/60 transition-colors shadow-2xs relative"
            title="Multi-Turn AI Chatbot powered by Gemini"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span className="hidden sm:inline">AI Chat</span>
            <span className="sm:hidden">Chat</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 animate-ping" />
          </button>

          {/* Find Nearby Drop-off */}
          <button
            id="btn-dropoff-nav"
            onClick={onOpenDropOff}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 transition-colors shadow-2xs"
            title="Find Nearby Recycling & Composting Drop-off Hubs"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden md:inline">Find Drop-off</span>
            <span className="md:hidden">Drop-off</span>
          </button>

          {/* Deep Thinking Mode Action */}
          <button
            id="btn-deep-thinking-nav"
            onClick={onOpenDeepThinking}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 transition-colors shadow-2xs"
            title="High Thinking Mode powered by Gemini 3.1 Pro"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden lg:inline">Deep LCA Audit</span>
            <span className="lg:hidden">LCA</span>
          </button>

          {/* 1M1B Project Slides/Report */}
          <button
            id="btn-project-report-nav"
            onClick={onOpenPresentation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 dark:from-emerald-600 dark:to-teal-600 shadow-sm shadow-emerald-700/20 transition-all hover:scale-[1.02]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">1M1B Report</span>
            <span className="sm:hidden">Report</span>
          </button>

          {/* Global Theme Toggle Button */}
          <button
            id="btn-theme-toggle"
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-700 dark:text-amber-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs flex items-center justify-center"
            title={theme === "dark" ? "Switch to daytime light mode" : "Switch to nighttime dark mode for students"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 transition-transform rotate-0 scale-100 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 transition-transform rotate-0 scale-100 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
