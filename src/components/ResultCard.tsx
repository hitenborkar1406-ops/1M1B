import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Recycle,
  Lightbulb,
  Droplets,
  Wind,
  ShieldCheck,
  BrainCircuit,
  Share2,
  ExternalLink,
  Layers,
  Sparkles,
  MapPin,
  MessageSquare
} from "lucide-react";
import { ClassificationResult, BinColor } from "../types";

interface ResultCardProps {
  result: ClassificationResult;
  onOpenDeepThinkingForCurrent: (itemName: string) => void;
  onOpenDropOff?: () => void;
  onOpenChat?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  onOpenDeepThinkingForCurrent,
  onOpenDropOff,
  onOpenChat,
}) => {
  // Helper to resolve bin styling
  const getBinBadgeStyle = (binColor: BinColor) => {
    switch (binColor) {
      case "blue":
        return {
          bg: "bg-blue-600",
          text: "text-white",
          border: "border-blue-700",
          lightBg: "bg-blue-50 text-blue-800 border-blue-200",
          title: "Dry Recyclables",
        };
      case "green":
        return {
          bg: "bg-emerald-600",
          text: "text-white",
          border: "border-emerald-700",
          lightBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          title: "Wet / Organic Compost",
        };
      case "red":
        return {
          bg: "bg-rose-600",
          text: "text-white",
          border: "border-rose-700",
          lightBg: "bg-rose-50 text-rose-800 border-rose-200",
          title: "Hazardous / E-Waste",
        };
      case "yellow":
        return {
          bg: "bg-amber-500",
          text: "text-slate-900",
          border: "border-amber-600",
          lightBg: "bg-amber-50 text-amber-900 border-amber-200",
          title: "Specialized Stream",
        };
      default:
        return {
          bg: "bg-slate-800",
          text: "text-white",
          border: "border-slate-900",
          lightBg: "bg-slate-100 text-slate-800 border-slate-300",
          title: "General Landfill Residual",
        };
    }
  };

  const binStyle = getBinBadgeStyle(result.binColorCode);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-200">
      {/* Top Banner with Bin Allocation */}
      <div className="px-5 sm:px-6 py-4 bg-slate-900 dark:bg-slate-950 text-white flex flex-wrap items-center justify-between gap-3 border-b dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl ${binStyle.bg} ${binStyle.text} flex items-center justify-center font-bold text-base shadow-sm`}
          >
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              Optimal Receptacle Destination
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              {result.binName}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-300 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {result.confidenceScore}% AI Confidence
          </span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${binStyle.bg} ${binStyle.text}`}>
            {result.primaryCategory}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Identified Item Title & Material Composition */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {result.itemName}
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Category: <strong className="text-slate-700 dark:text-slate-300">{result.primaryCategory}</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              Materials:
            </span>
            {result.materialComposition.map((mat, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* CONTAMINATION WARNING BOX - Crucial for 1M1B & Real Impact */}
        {result.contaminationWarning.isRisk ? (
          <div className="rounded-xl border border-amber-300 dark:border-amber-800/80 bg-amber-50/80 dark:bg-amber-950/40 p-4 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                    High Contamination Risk Detected
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 dark:bg-amber-900/90 text-amber-900 dark:text-amber-200">
                    Source Action Required
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 font-normal leading-relaxed">
                  {result.contaminationWarning.details}
                </p>
                <div className="mt-2 pt-2 border-t border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-300 font-medium flex items-center gap-1.5">
                  <strong className="text-amber-950 dark:text-amber-200">Pre-Sorting Prevention:</strong>
                  <span>{result.contaminationWarning.preventionStep}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/60 dark:bg-emerald-950/40 p-3.5 flex items-center gap-3 transition-colors">
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            </div>
            <div className="text-xs text-emerald-950 dark:text-emerald-200">
              <strong className="font-semibold text-emerald-900 dark:text-emerald-300">Clean Stream: </strong>
              {result.contaminationWarning.details || "No adverse batch contamination risk detected when deposited empty and dry."}
            </div>
          </div>
        )}

        {/* Step-by-Step Disposal Protocol */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Standard Operating Protocol for Disposal
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {result.stepByStepDisposal.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-xs text-slate-800 dark:text-slate-200 font-medium transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcycling & DIY Ideas */}
        {result.upcyclingIdeas && result.upcyclingIdeas.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                Circular Economy & Upcycling Alternatives (Prior to Discarding)
              </h4>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/60">
                SDG 12.5 Reuse
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.upcyclingIdeas.map((idea, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/70 bg-white dark:bg-slate-800/70 hover:border-emerald-300 dark:hover:border-emerald-500 transition-colors shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">{idea.title}</h5>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        idea.difficulty === "Easy"
                          ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50"
                          : idea.difficulty === "Medium"
                          ? "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50"
                          : "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50"
                      }`}
                    >
                      {idea.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{idea.description}</p>
                  <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 pt-1">
                    Value: {idea.savedCostOrUtility}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Environmental Savings Grid */}
        <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/70 dark:border-slate-700/60 transition-colors">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
            <span>Estimated Ecological Impact (Per Unit Properly Diverted)</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">+{result.sustainabilityImpact.ecoPoints} Eco-Points Earned</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-center transition-colors">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-1">
                <Wind className="w-4 h-4" />
              </div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white">
                {result.sustainabilityImpact.co2eSavedKg} kg
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">CO2e Emissions Prevented</div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-center transition-colors">
              <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-1">
                <Trash2 className="w-4 h-4" />
              </div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white">
                {result.sustainabilityImpact.landfillDivertedKg} kg
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Landfill Mass Diverted</div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-center transition-colors">
              <div className="w-7 h-7 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-1">
                <Droplets className="w-4 h-4" />
              </div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white">
                {result.sustainabilityImpact.waterPreservedLiters} L
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Freshwater Preserved</div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-center transition-colors">
              <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-1">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                +{result.sustainabilityImpact.ecoPoints}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Student Impact Credits</div>
            </div>
          </div>
        </div>

        {/* Fun Fact / Did you know? */}
        {result.funFact && (
          <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-xs text-indigo-950 dark:text-indigo-200 flex items-start gap-2.5 transition-colors">
            <span className="font-bold text-indigo-800 dark:text-indigo-300 shrink-0">Did you know?</span>
            <span className="leading-relaxed">{result.funFact}</span>
          </div>
        )}

        {/* Find Nearby Drop-off Banner */}
        {onOpenDropOff && (
          <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              </div>
              <div>
                <span className="font-bold text-emerald-950 dark:text-emerald-200 block">
                  Need a local drop-off bin or composting site?
                </span>
                <span className="text-emerald-800/90 dark:text-emerald-300/80 text-[11px]">
                  Locate certified centers, municipal composters & campus kiosks for this {result.primaryCategory.toLowerCase()} item.
                </span>
              </div>
            </div>
            <button
              onClick={onOpenDropOff}
              className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs shrink-0"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Find Nearby Drop-Off</span>
            </button>
          </div>
        )}

        {/* Gemini Chat & Deep Thinking Actions */}
        <div className="pt-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Have questions about this item or need campus zero-waste policy analysis?
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {onOpenChat && (
              <button
                id="btn-chat-current-item"
                onClick={onOpenChat}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold text-teal-900 dark:text-teal-200 bg-teal-100 dark:bg-teal-950/70 hover:bg-teal-200 dark:hover:bg-teal-900/80 border border-teal-300 dark:border-teal-700/70 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                title="Open Multi-Turn Gemini Chat for this item"
              >
                <MessageSquare className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>Ask Gemini Chatbot</span>
              </button>
            )}
            <button
              id="btn-deep-think-current"
              onClick={() => onOpenDeepThinkingForCurrent(result.itemName)}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-900 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-950/70 hover:bg-indigo-200 dark:hover:bg-indigo-900/80 border border-indigo-300 dark:border-indigo-700/70 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <BrainCircuit className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
              <span>Deep LCA Audit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
