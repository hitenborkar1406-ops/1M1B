import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Navbar } from "./components/Navbar";
import { CameraScanner } from "./components/CameraScanner";
import { ResultCard } from "./components/ResultCard";
import { CampusDashboard } from "./components/CampusDashboard";
import { DeepThinkingModal } from "./components/DeepThinkingModal";
import { NearbyDropOffModal } from "./components/NearbyDropOffModal";
import { GeminiChatbot } from "./components/GeminiChatbot";
import { ClassificationResult } from "./types";

export default function App() {
  const [currentResult, setCurrentResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ClassificationResult[]>([]);
  const [ecoPoints, setEcoPoints] = useState(85);
  const [divertedKg, setDivertedKg] = useState(1.42);
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
    <div className="ecosort-shell fresh-shell min-h-screen flex flex-col font-sans antialiased transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        ecoPoints={ecoPoints}
        divertedKg={divertedKg}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenChat={() => setIsChatOpen(true)}
      />

      <div className="fresh-hero px-4 sm:px-6">
        <div className="fresh-hero-inner max-w-6xl mx-auto">
          <div className="fresh-hero-copy">
            <div className="fresh-eyebrow">EcoSort AI / instant material guidance</div>
            <h1>Make the next bin obvious.</h1>
            <p>Show us what you’re holding. We’ll identify it, flag the catch, and tell you what to do next.</p>
          </div>
          <div className="fresh-hero-note">
            <span>01</span>
            <strong>Scan</strong>
            <span>02</span>
            <strong>Act</strong>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <main className="ecosort-workspace fresh-workspace flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="fresh-layout max-w-6xl mx-auto">
          <section className="fresh-stage">
            <CameraScanner onAnalyze={handleAnalyze} isLoading={isLoading} />

            {currentResult && (
              <ResultCard
                result={currentResult}
                onOpenDeepThinkingForCurrent={handleOpenDeepThinkingForCurrent}
                onOpenDropOff={() => setIsDropOffOpen(true)}
                onOpenChat={() => setIsChatOpen(true)}
              />
            )}
          </section>
          <aside className="fresh-rail">
            <div className="fresh-rail-heading">
              <span>SESSION SIGNAL</span>
              <strong>{history.length} checks</strong>
            </div>
            <CampusDashboard
              history={history}
              onSelectHistoryItem={(item) => setCurrentResult(item)}
              ecoPoints={ecoPoints}
              divertedKg={divertedKg}
            />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="fresh-footer py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        Designed for clearer everyday sorting <span>·</span> 1M1B
      </footer>

      {/* High Thinking Modal */}
      <DeepThinkingModal
        isOpen={isDeepThinkingOpen}
        onClose={() => setIsDeepThinkingOpen(false)}
        defaultContextItem={deepThinkingContext}
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

    </div>
  );
}
