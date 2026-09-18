import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Award,
  Globe,
  ShieldAlert,
  Layers,
  Cpu,
  Users,
  TrendingUp,
  FileSpreadsheet
} from "lucide-react";

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1);

  if (!isOpen) return null;

  const projectDetails = {
    title: "EcoSort AI: Smart Campus & Household Waste Segregation & Upcycling Guide",
    sdgPrimary: "SDG 12: Responsible Consumption and Production",
    sdgSecondary: "SDG 11: Sustainable Cities and Communities",
    problemStatement:
      "How might we use multimodal AI to identify and categorize daily consumer/campus waste so that students and households can correctly segregate waste at the source and reduce landfill contamination?",
    targetUsers: "College students, campus cafeteria staff, hostel residents, and urban households.",
    aiSolution:
      "A multimodal vision & text pipeline powered by Gemini models that performs instant item classification into standard color-coded bins (Blue, Green, Red, Black). Critically, it checks for source-contamination risks (e.g., grease on pizza boxes, hazardous battery chemicals), supplies step-by-step pre-disposal actions, suggests creative DIY upcycling pathways, and models high-thinking lifecycle assessments.",
    responsibleAi: {
      fairness: "Trained and prompted across diverse regional packaging standards, eliminating bias toward specific brands or geographic waste formats.",
      transparency: "Explicitly explains why an item is directed to a specific bin, what materials comprise it, and what happens if contaminated.",
      ethics: "Encourages sustainable reduction and reuse first before discarding, preventing greenwashing and misleading recycling claims.",
      privacy: "Operates with zero biometric retention; camera frames are analyzed statelessly without storing facial data or personal identifiers.",
    },
    expectedImpact:
      "A 40% reduction in campus paper batch contamination, diversion of over 1.2 tons of organics to composting annually per campus dining hall, and gamified student participation through verifiable eco-points.",
  };

  const fullTextToCopy = `=====================================================
1M1B AI FOR SUSTAINABILITY VIRTUAL INTERNSHIP
Project Submission Document (In Collaboration with IBM SkillsBuild & AICTE)
=====================================================

1. PROJECT DESCRIPTION
-----------------------------------------------------
* Title: ${projectDetails.title}
* SDG Alignment: Primary: ${projectDetails.sdgPrimary} | Secondary: ${projectDetails.sdgSecondary}
* Problem Statement:
"${projectDetails.problemStatement}"

* AI Solution Overview:
${projectDetails.aiSolution}

* Target Users:
${projectDetails.targetUsers}

2. RESPONSIBLE AI CONSIDERATIONS
-----------------------------------------------------
* Fairness: ${projectDetails.responsibleAi.fairness}
* Transparency: ${projectDetails.responsibleAi.transparency}
* Ethics: ${projectDetails.responsibleAi.ethics}
* Privacy: ${projectDetails.responsibleAi.privacy}

3. EXPECTED IMPACT & PROTOTYPE WORKFLOW
-----------------------------------------------------
* Expected Impact:
${projectDetails.expectedImpact}

* Prototype Architecture:
1. Input: Camera capture, image upload, or natural language query.
2. Multimodal AI Processing: Gemini 3.8 Flash for zero-shot object, material, and contamination detection.
3. High Thinking Engine: Gemini 3.1 Pro (ThinkingLevel.HIGH) for Lifecycle Assessment (LCA) & campus zero-waste policy roadmaps.
4. Output: Color-coded bin routing, contamination warnings, DIY upcycling steps, and CO2e/landfill diversion analytics.
=====================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullTextToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 to-teal-900 dark:from-emerald-950 dark:to-teal-950 text-white flex items-center justify-between border-b dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                1M1B & IBM SkillsBuild Internship Presentation Deliverable
              </h3>
              <p className="text-xs text-emerald-200">
                Official AICTE / 1M1B project template and rubric mapping
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy PPT Content</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 pt-3 bg-slate-50 dark:bg-slate-850 gap-2 transition-colors">
          <button
            onClick={() => setActiveSlide(1)}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeSlide === 1
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Slide 1: Problem & SDG Alignment
          </button>
          <button
            onClick={() => setActiveSlide(2)}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeSlide === 2
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Slide 2: AI Solution & Architecture
          </button>
          <button
            onClick={() => setActiveSlide(3)}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeSlide === 3
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Slide 3: Responsible AI & Impact
          </button>
        </div>

        {/* Slide Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          {activeSlide === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Project Title
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {projectDetails.title}
                </h2>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-200/70 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 font-semibold">
                    Primary: {projectDetails.sdgPrimary}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-semibold">
                    Secondary: {projectDetails.sdgSecondary}
                  </span>
                </div>
              </div>

              {/* Official Problem Statement */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-2xs">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Official 1M1B Problem Statement Format:
                </span>
                <blockquote className="mt-2 text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 italic pl-3 border-l-4 border-emerald-500 bg-slate-50 dark:bg-slate-800 py-2 rounded-r-lg">
                  "{projectDetails.problemStatement}"
                </blockquote>
              </div>

              {/* Target Users & Pain Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Target Users
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {projectDetails.targetUsers}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Real-World Pain Point
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Over 25% of clean recyclable paper/cardboard in university dining halls is rendered unusable at recycling facilities due to food oils and improper sorting.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSlide === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  AI Solution Architecture & Role of AI
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  {projectDetails.aiSolution}
                </p>

                {/* Architecture Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-xs">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 block">1. Input</span>
                    <span className="text-slate-500 dark:text-slate-400">Camera frame or text description</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 block">2. Vision AI</span>
                    <span className="text-slate-500 dark:text-slate-400">Multimodal Gemini material analysis</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 block">3. Contamination Alert</span>
                    <span className="text-slate-500 dark:text-slate-400">Source grease / chemical prevention</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 block">4. Circular Action</span>
                    <span className="text-slate-500 dark:text-slate-400">Color bin + DIY upcycling guide</span>
                  </div>
                </div>
              </div>

              {/* High Thinking Integration */}
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  High Thinking Model Integration (Gemini 3.1 Pro Preview)
                </span>
                <p className="text-xs text-indigo-950 dark:text-indigo-200 mt-1 leading-relaxed">
                  Handles complex material lifecycle assessments (LCA), institutional campus procurement policy blueprints, and Material Recovery Facility (MRF) degradation modeling with ThinkingLevel.HIGH.
                </p>
              </div>
            </div>
          )}

          {activeSlide === 3 && (
            <div className="space-y-4">
              {/* Mandatory Responsible AI section */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Mandatory Responsible AI Considerations:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                    <span className="font-bold text-xs text-slate-900 dark:text-white block mb-1">Fairness</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {projectDetails.responsibleAi.fairness}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                    <span className="font-bold text-xs text-slate-900 dark:text-white block mb-1">Transparency</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {projectDetails.responsibleAi.transparency}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                    <span className="font-bold text-xs text-slate-900 dark:text-white block mb-1">Ethics</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {projectDetails.responsibleAi.ethics}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                    <span className="font-bold text-xs text-slate-900 dark:text-white block mb-1">Privacy</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {projectDetails.responsibleAi.privacy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expected Impact */}
              <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  Expected Real-World Impact
                </span>
                <p className="mt-1 text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed font-medium">
                  {projectDetails.expectedImpact}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs transition-colors">
          <span className="text-slate-500 dark:text-slate-400">
            Slide {activeSlide} of 3 • Prepared for 1M1B – IBM SkillsBuild AI for Sustainability
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSlide((prev) => (prev > 1 ? prev - 1 : 3))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveSlide((prev) => (prev < 3 ? prev + 1 : 1))}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
