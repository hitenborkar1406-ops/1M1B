import React from "react";
import { Recycle, Globe, Sun, Moon, MessageSquare } from "lucide-react";

interface NavbarProps {
  ecoPoints: number;
  divertedKg: number;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  ecoPoints,
  divertedKg,
  theme,
  onToggleTheme,
  onOpenChat,
}) => {
  return (
    <header className="ecosort-nav sticky top-0 z-40 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & SDG Badge */}
        <div className="flex items-center gap-3">
          <div className="ecosort-brand-mark w-10 h-10 flex items-center justify-center">
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
          </div>
        </div>

        {/* Action Controls & Metrics */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="flex items-center gap-2 sm:gap-3 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs transition-colors">
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">{ecoPoints} eco-points</span>
            <span className="hidden sm:inline text-slate-600 dark:text-slate-400">{divertedKg.toFixed(2)} kg diverted</span>
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
