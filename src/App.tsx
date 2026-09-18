import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Navbar } from "./components/Navbar";
import { CameraScanner } from "./components/CameraScanner";
import { ResultCard } from "./components/ResultCard";
import { CampusDashboard } from "./components/CampusDashboard";
import { DeepThinkingModal } from "./components/DeepThinkingModal";
import { PresentationModal } from "./components/PresentationModal";
import { NearbyDropOffModal } from "./components/NearbyDropOffModal";
import { GeminiChatbot } from "./components/GeminiChatbot";
import { ClassificationResult } from "./types";
import { Award, Globe, FileText, BrainCircuit, Sparkles, CheckCircle2, MapPin, MessageSquare } from "lucide-react";

export default function App() {
  const [currentResult, setCurrentResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ClassificationResult[]>([]);
  const [ecoPoints, setEcoPoints] = useState(85);
  const [divertedKg, setDivertedKg] = useState(1.42);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isDeepThinkingOpen, setIsDeepThinkingOpen] = useState(false);
  const [isDropOffOpen, setIsDropOffOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [deepThinkingContext, setDeepThinkingContext] = useState<string>(
    "Cafeteria Cardboard & Food Packaging"
  );
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ecosort-theme");
      if (saved === "dark" || saved === "light") return saved;
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  });

  // Sync theme with html root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("ecosort-theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Load a default demo item on initial mount so users don't see an empty screen
  useEffect(() => {
    const initialItem: ClassificationResult = {
      itemName: "Greasy Cafeteria Takeaway Pizza Box",
      confidenceScore: 97,
      primaryCategory: "Dry / Recyclable",
      binColorCode: "blue",
      binName: "Dual Sort: Blue Bin (Clean Lid) & Green Bin (Greasy Base)",
      materialComposition: ["Corrugated Cardboard", "Food Grease & Organic Fats"],
      contaminationWarning: {
        isRisk: true,
        details:
          "Food grease and melted cheese bind irreversibly with wood pulp fibers during recycling. Depositing a greasy box contaminates up to 50 kg of clean paper pulping batches.",
        preventionStep:
          "Tear the box in half: place the unsoiled top lid into the Blue Recycling Bin, and place the cheese/oil-soaked bottom into the Green Organic Bin.",
      },
      stepByStepDisposal: [
        "Inspect cardboard for cheese and food grease stains.",
        "Tear off clean lid and flatten for the Blue Recycling Bin.",
        "Compost greasy bottom in the Green Organic Bin.",
        "Never place food-soaked paper into standard paper chutes.",
      ],
      upcyclingIdeas: [
        {
          title: "Biodegradable Garden Weed Mat",
          description: "Lay unprinted cardboard strips under campus planters to retain soil moisture and suppress weeds.",
          difficulty: "Easy",
          savedCostOrUtility: "Saves $12 on landscape plastic barriers",
        },
        {
          title: "Dorm Desk Grid Organizer",
          description: "Cut slotted interlocking cardboard dividers to organize desk stationery and cables.",
          difficulty: "Easy",
          savedCostOrUtility: "Saves $8 on plastic trays",
        },
      ],
      sustainabilityImpact: {
        co2eSavedKg: 0.42,
        landfillDivertedKg: 0.28,
        waterPreservedLiters: 18,
        ecoPoints: 30,
      },
      sdgAlignment: {
        primaryGoal: "SDG 12: Responsible Consumption and Production",
        target: "Target 12.5: Substantially reduce waste generation through prevention, reduction, and recycling",
        summary: "Source separation prevents batch recycling failure and reduces landfill methane emissions.",
      },
      funFact:
        "Recycling 1 ton of clean cardboard saves 9 cubic yards of landfill space, 46 gallons of oil, and 7,000 gallons of water!",
      timestamp: Date.now(),
    };

    const priorItem1: ClassificationResult = {
      itemName: "Rinsed PET Beverage Bottle",
      confidenceScore: 99,
      primaryCategory: "Dry / Recyclable",
      binColorCode: "blue",
      binName: "Blue Bin: Dry Recyclable",
      materialComposition: ["Polyethylene Terephthalate (PET #1)", "HDPE Cap"],
      contaminationWarning: {
        isRisk: false,
        details: "Clean and dry container.",
        preventionStep: "Crush bottle to save space and screw cap back on.",
      },
      stepByStepDisposal: ["Empty residual liquids.", "Crush bottle.", "Deposit in Blue Bin."],
      upcyclingIdeas: [],
      sustainabilityImpact: {
        co2eSavedKg: 0.22,
        landfillDivertedKg: 0.18,
        waterPreservedLiters: 8,
        ecoPoints: 15,
      },
      sdgAlignment: {
        primaryGoal: "SDG 12: Responsible Consumption and Production",
        target: "Target 12.5: Reduce waste",
        summary: "Circular polymer recovery.",
      },
      funFact: "Recycled PET bottles can be spun into campus polyester fleece jackets.",
      timestamp: Date.now() - 3600000 * 3,
    };

    const priorItem2: ClassificationResult = {
      itemName: "Crushed Aluminum Drink Can",
      confidenceScore: 98,
      primaryCategory: "Dry / Recyclable",
      binColorCode: "blue",
      binName: "Blue Bin: Metal Recyclables",
      materialComposition: ["Aluminum Alloy 3104/3004"],
      contaminationWarning: {
        isRisk: false,
        details: "No hazardous residue.",
        preventionStep: "Drain leftover carbonated liquid.",
      },
      stepByStepDisposal: ["Drain drops.", "Deposit in metal chute."],
      upcyclingIdeas: [],
      sustainabilityImpact: {
        co2eSavedKg: 0.35,
        landfillDivertedKg: 0.14,
        waterPreservedLiters: 12,
        ecoPoints: 20,
      },
      sdgAlignment: {
        primaryGoal: "SDG 12: Responsible Consumption and Production",
        target: "Target 12.5: Substantially reduce waste",
        summary: "Aluminum is infinitely recyclable without quality loss.",
      },
      funFact: "Recycling an aluminum can saves 95% of the energy needed to make a new one.",
      timestamp: Date.now() - 3600000 * 6,
    };

    const priorItem3: ClassificationResult = {
      itemName: "Campus Dining Hall Vegetable Scraps",
      confidenceScore: 95,
      primaryCategory: "Wet / Organic",
      binColorCode: "green",
      binName: "Green Bin: Organic & Compost",
      materialComposition: ["Plant Cellulose", "Moisture & Organic Matter"],
      contaminationWarning: {
        isRisk: false,
        details: "Compostable organic matter.",
        preventionStep: "Ensure no plastic wrappers or stickers are mixed in.",
      },
      stepByStepDisposal: ["Remove any produce stickers.", "Place in Green Compost Bin."],
      upcyclingIdeas: [],
      sustainabilityImpact: {
        co2eSavedKg: 0.45,
        landfillDivertedKg: 0.52,
        waterPreservedLiters: 4,
        ecoPoints: 10,
      },
      sdgAlignment: {
        primaryGoal: "SDG 12: Responsible Consumption and Production",
        target: "Target 12.3: Halve food waste",
        summary: "Composting avoids anaerobic landfill methane production.",
      },
      funFact: "Food waste compost enriches campus community garden soil with zero artificial chemicals.",
      timestamp: Date.now() - 3600000 * 12,
    };

    const priorItem4: ClassificationResult = {
      itemName: "Recycled Study Paper & Handouts",
      confidenceScore: 96,
      primaryCategory: "Dry / Recyclable",
      binColorCode: "blue",
      binName: "Blue Bin: Clean Paper",
      materialComposition: ["Uncoated Cellulose Pulp Paper"],
      contaminationWarning: {
        isRisk: false,
        details: "Clean non-confidential sheets.",
        preventionStep: "Remove metal binder clips or plastic sleeves.",
      },
      stepByStepDisposal: ["Remove plastic clips.", "Flatten and place in Paper Bin."],
      upcyclingIdeas: [],
      sustainabilityImpact: {
        co2eSavedKg: 0.38,
        landfillDivertedKg: 0.30,
        waterPreservedLiters: 22,
        ecoPoints: 10,
      },
      sdgAlignment: {
        primaryGoal: "SDG 12: Responsible Consumption and Production",
        target: "Target 12.5: Recycling paper fibers",
        summary: "Clean paper pulp is reused up to 6 times.",
      },
      funFact: "Recycling paper uses 60% less energy than manufacturing paper from virgin wood pulp.",
      timestamp: Date.now() - 3600000 * 24,
    };

    setCurrentResult(initialItem);
    setHistory([initialItem, priorItem1, priorItem2, priorItem3, priorItem4]);
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.75 },
        colors: ["#10b981", "#3b82f6", "#f59e0b", "#6366f1"],
      });
    } catch (e) {
      // ignore in headless contexts
    }
  };

  const handleAnalyze = async (payload: {
    textQuery?: string;
    imageBase64?: string;
    mimeType?: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to classify item");
      }

      const resultData: ClassificationResult = await response.json();
      resultData.timestamp = Date.now();

      setCurrentResult(resultData);
      setHistory((prev) => [resultData, ...prev.slice(0, 19)]);

      const addedPoints = resultData.sustainabilityImpact?.ecoPoints || 25;
      const addedKg = resultData.sustainabilityImpact?.landfillDivertedKg || 0.2;

      setEcoPoints((prev) => prev + addedPoints);
      setDivertedKg((prev) => prev + addedKg);

      triggerConfetti();
    } catch (err: any) {
      console.error("Analysis failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDeepThinkingForCurrent = (itemName: string) => {
    setDeepThinkingContext(itemName);
    setIsDeepThinkingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-100 dark:selection:bg-emerald-900 selection:text-emerald-900 dark:selection:text-emerald-100 transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        ecoPoints={ecoPoints}
        divertedKg={divertedKg}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenPresentation={() => setIsPresentationOpen(true)}
        onOpenDeepThinking={() => {
          setDeepThinkingContext(currentResult?.itemName || "Campus Cafeteria Waste Stream");
          setIsDeepThinkingOpen(true);
        }}
        onOpenDropOff={() => setIsDropOffOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Hero SDG Alignment & Purpose Strip */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 dark:from-emerald-950 dark:via-slate-900 dark:to-slate-950 text-white py-4 px-4 sm:px-6 shadow-inner border-b border-emerald-700/40 dark:border-slate-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-md bg-white/10 dark:bg-emerald-500/20 font-mono font-bold text-emerald-300 border border-white/10 dark:border-emerald-500/30">
              UN SDG 12
            </span>
            <span className="font-semibold text-white">
              Target 12.5: Substantially reduce waste generation through source prevention, reduction & recycling
            </span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200 dark:text-emerald-300">
            <button
              onClick={() => setIsDropOffOpen(true)}
              className="hover:text-white underline underline-offset-4 flex items-center gap-1 font-medium text-emerald-300 dark:text-emerald-400"
            >
              <MapPin className="w-3.5 h-3.5" />
              Find Local Drop-off Hubs
            </button>
            <span className="hidden sm:inline opacity-60">•</span>
            <button
              onClick={() => setIsPresentationOpen(true)}
              className="hover:text-white underline underline-offset-4 flex items-center gap-1 font-medium"
            >
              <FileText className="w-3.5 h-3.5" />
              1M1B Slides & Deliverable
            </button>
            <span className="hidden sm:inline opacity-60">•</span>
            <button
              onClick={() => {
                setDeepThinkingContext(currentResult?.itemName || "Campus Cafeteria Packaging");
                setIsDeepThinkingOpen(true);
              }}
              className="hover:text-white underline underline-offset-4 flex items-center gap-1 font-medium text-amber-300 dark:text-amber-400"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              High Thinking Mode (Gemini 3.1 Pro)
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Scanner & Active Result) - 7 cols on lg */}
          <div className="lg:col-span-7 space-y-6">
            <CameraScanner onAnalyze={handleAnalyze} isLoading={isLoading} />

            {currentResult && (
              <ResultCard
                result={currentResult}
                onOpenDeepThinkingForCurrent={handleOpenDeepThinkingForCurrent}
                onOpenDropOff={() => setIsDropOffOpen(true)}
                onOpenChat={() => setIsChatOpen(true)}
              />
            )}
          </div>

          {/* Right Column (Campus Dashboard & Project Info) - 5 cols on lg */}
          <div className="lg:col-span-5 space-y-6">
            <CampusDashboard
              history={history}
              onSelectHistoryItem={(item) => setCurrentResult(item)}
              ecoPoints={ecoPoints}
              divertedKg={divertedKg}
            />

            {/* Quick 1M1B Framework Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 space-y-4 transition-colors duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60 flex items-center justify-center font-bold text-xs">
                    1M1B
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      Internship Problem Statement
                    </h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">In collaboration with IBM SkillsBuild</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsPresentationOpen(true)}
                  className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
                >
                  Expand Full
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-xs text-slate-800 dark:text-slate-200 italic leading-relaxed">
                "How might we use multimodal AI to identify and categorize daily consumer/campus waste so that students and households can correctly segregate waste at the source and reduce landfill contamination?"
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Multimodal Computer Vision with Gemini 3.8 Flash</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Deep LCA Thinking Mode with Gemini 3.1 Pro Preview</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Nearby Drop-off & Composting Locator (Map & List)</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Source Contamination Prevention Protocol</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  id="btn-open-dropoff-side"
                  onClick={() => setIsDropOffOpen(true)}
                  className="py-2.5 px-3 rounded-xl border border-emerald-300 dark:border-emerald-700/60 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-900 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Drop-off Hubs</span>
                </button>

                <button
                  id="btn-open-presentation-side"
                  onClick={() => setIsPresentationOpen(true)}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>1M1B Slides</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 mt-12 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
            <span>EcoSort AI</span>
            <span>•</span>
            <span className="text-emerald-700 dark:text-emerald-400">Aligned with UN SDG 12 & SDG 11</span>
          </div>
          <div>
            Built for 1M1B AI for Sustainability Virtual Internship & IBM SkillsBuild
          </div>
        </div>
      </footer>

      {/* High Thinking Modal */}
      <DeepThinkingModal
        isOpen={isDeepThinkingOpen}
        onClose={() => setIsDeepThinkingOpen(false)}
        defaultContextItem={deepThinkingContext}
      />

      {/* 1M1B Project Presentation Modal */}
      <PresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
      />

      {/* Nearby Drop-Off & Composting Finder */}
      <NearbyDropOffModal
        isOpen={isDropOffOpen}
        onClose={() => setIsDropOffOpen(false)}
        currentItem={currentResult}
      />

      {/* Multi-Turn Gemini Chatbot Modal */}
      <GeminiChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentItem={currentResult}
      />

      {/* Floating Gemini Chat Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="btn-floating-gemini-chat"
          onClick={() => setIsChatOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-700/30 hover:shadow-emerald-600/40 hover:scale-105 transition-all duration-200 border border-emerald-400/30"
          title="Chat with EcoSort AI (Multi-Turn Gemini)"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-emerald-700 animate-pulse" />
          </div>
          <span className="hidden sm:inline">Ask EcoBot</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-white/20 text-emerald-100 font-mono">
            Gemini
          </span>
        </button>
      </div>
    </div>
  );
}
