import React, { useState } from "react";
import {
  X,
  BrainCircuit,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  FileCheck,
  ChevronRight,
  HelpCircle
} from "lucide-react";

interface DeepThinkingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultContextItem?: string;
}

export const DeepThinkingModal: React.FC<DeepThinkingModalProps> = ({
  isOpen,
  onClose,
  defaultContextItem = "Campus Cafeteria & Academic Waste Streams",
}) => {
  const [contextItem, setContextItem] = useState(defaultContextItem);
  const [query, setQuery] = useState(
    "Formulate an institutional zero-waste roadmap and material lifecycle assessment for this waste stream on university campuses."
  );
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [modelUsed, setModelUsed] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const presets = [
    {
      title: "Campus Zero-Waste Policy Blueprint",
      text: "Formulate an institutional zero-waste roadmap and material lifecycle assessment for this waste stream on university campuses.",
    },
    {
      title: "MRF Contamination Economics & LCA",
      text: "Conduct a rigorous End-to-End Lifecycle Assessment (LCA) and explain the economic breakdown when Material Recovery Facilities (MRFs) reject this contaminated stream.",
    },
    {
      title: "Industrial Symbiosis & Upcycling",
      text: "Identify high-value circular industrial symbiosis pathways and student maker-space upcycling engineering steps for this material.",
    },
    {
      title: "1M1B Responsible AI & SDG Matrix",
      text: "Generate the formal 1M1B / IBM SkillsBuild Responsible AI (Fairness, Transparency, Ethics, Privacy) compliance justification for this solution.",
    },
  ];

  const handleRunThinking = async (selectedQuery?: string) => {
    const activeQuery = selectedQuery || query;
    setIsLoading(true);
    setAnalysis(null);
    try {
      const res = await fetch("/api/deep-think", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: activeQuery,
          contextItem,
        }),
      });
      const data = await res.json();
      setAnalysis(data.analysis || "Analysis complete.");
      setModelUsed(data.modelUsed || "gemini-3.1-pro-preview");
    } catch (err: any) {
      setAnalysis("Error running deep thinking audit. Please check your network connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!analysis) return;
    navigator.clipboard.writeText(analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <BrainCircuit className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">
                  High Thinking Mode: Deep Sustainability & Circular Audit
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  Gemini 3.1 Pro Preview
                </span>
              </div>
              <p className="text-xs text-indigo-200/80">
                Executes extended step-by-step reasoning for campus policy blueprints & material life cycles.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Target Material Context */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 transition-colors">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider shrink-0">
              Target Focus Item / Stream:
            </span>
            <input
              type="text"
              value={contextItem}
              onChange={(e) => setContextItem(e.target.value)}
              className="flex-1 w-full bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-slate-100 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="E.g. Cafeteria Greasy Pizza Boxes or Spent AA Batteries"
            />
          </div>

          {/* Preset Prompts */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Select Analytical Focus or Type Custom Prompt:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(preset.text);
                    handleRunThinking(preset.text);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-start justify-between gap-2 ${
                    query === preset.text
                      ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-200 font-medium"
                      : "border-slate-200 dark:border-slate-700/80 hover:border-indigo-200 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <span>{preset.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Query Input */}
          <div className="flex gap-2">
            <textarea
              rows={2}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask an advanced circular economy, policy, or institutional question..."
              className="flex-1 p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors"
            />
            <button
              onClick={() => handleRunThinking()}
              disabled={isLoading || !query.trim()}
              className="px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-sm transition-transform active:scale-95"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4" />
                  <span>Execute</span>
                </>
              )}
            </button>
          </div>

          {/* Output Container */}
          {isLoading && (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full border-3 border-indigo-600 border-t-transparent animate-spin mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Gemini 3.1 Pro Thinking Mode Active (Level: HIGH)...
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Reasoning through complex multi-layer material bonds, MRF economic degradation, and campus policy metrics.
                </p>
              </div>
            </div>
          )}

          {analysis && !isLoading && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 p-4 sm:p-5 space-y-4 transition-colors">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Comprehensive Strategic Report
                  </span>
                  {modelUsed && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {modelUsed}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Report</span>
                    </>
                  )}
                </button>
              </div>

              {/* Rendered Text Body */}
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {analysis}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 transition-colors">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Meets 1M1B Deep Reasoning & Responsible AI criteria</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
